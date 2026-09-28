#!/usr/bin/env python3
"""
LinkedIn Follower & Connection Scraper for yust.dev
Extracts live followers and connection count for https://www.linkedin.com/in/yousefmsm1/
Supports:
1. Reading from local Google Chrome / Brave profiles on Linux via SecretService
2. Environment variable LINKEDIN_LI_AT_COOKIE
3. Command-line argument --cookie
4. --sync flag to write directly to src/data/linkedin.json
5. --save-env flag to persist the cookie in .env
"""

import sys
import os
import re
import json
import argparse
import urllib.request
from datetime import datetime, timezone

PROFILE_URL = "https://www.linkedin.com/in/yousefmsm1/"
DEFAULT_FALLBACK_COUNT = 1994


def get_cookie_from_browser():
    """Attempt to extract and decrypt li_at cookie from local Chrome/Brave databases."""
    try:
        import sqlite3
        import secretstorage
        from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
        from cryptography.hazmat.primitives import hashes
        from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
    except ImportError:
        return None

    try:
        bus = secretstorage.dbus_init()
        collection = secretstorage.get_default_collection(bus)
        passwords = {}
        for item in collection.get_all_items():
            label = item.get_label()
            if "Safe Storage" in label and "Control" not in label:
                sec = item.get_secret()
                if sec:
                    if isinstance(sec, str):
                        sec = sec.encode("utf-8")
                    passwords[label] = sec

        cookie_paths = [
            os.path.expanduser("~/.config/google-chrome/Profile 7/Cookies"),
            os.path.expanduser("~/.config/google-chrome/Default/Cookies"),
            os.path.expanduser("~/.config/BraveSoftware/Brave-Origin/Default/Cookies"),
            os.path.expanduser("~/.config/BraveSoftware/Brave-Browser/Default/Cookies"),
        ]

        for p in cookie_paths:
            if not os.path.exists(p):
                continue
            try:
                conn = sqlite3.connect(f"file:{p}?immutable=1", uri=True)
                c = conn.cursor()
                c.execute("SELECT name, value, encrypted_value FROM cookies WHERE name = 'li_at'")
                row = c.fetchone()
                if not row:
                    continue
                name, val, enc = row
                if val:
                    return val
                if enc and (enc[:3] == b"v11" or enc[:3] == b"v10"):
                    for label, pw in passwords.items():
                        kdf = PBKDF2HMAC(
                            algorithm=hashes.SHA1(),
                            length=16,
                            salt=b"saltysalt",
                            iterations=1,
                        )
                        key = kdf.derive(pw)
                        cipher = Cipher(algorithms.AES(key), modes.CBC(b" " * 16))
                        dec = cipher.decryptor().update(enc[3:])
                        pad = dec[-1]
                        if 1 <= pad <= 16:
                            plaintext = dec[:-pad]
                            cookie_val = plaintext[32:].decode("utf-8", errors="ignore")
                            if cookie_val.startswith("AQED"):
                                return cookie_val
            except Exception:
                continue
    except Exception:
        pass
    return None


def scrape_linkedin(cookie: str):
    """Scrape LinkedIn profile using the session cookie."""
    cookie_str = cookie if "=" in cookie else f"li_at={cookie}"
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36"
        ),
        "Cookie": cookie_str,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
    }

    req = urllib.request.Request(PROFILE_URL, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            if resp.status != 200:
                print(f"[!] LinkedIn returned status {resp.status}", file=sys.stderr)
                return None
            html = resp.read().decode("utf-8", errors="ignore")

            # Check if authwall
            if "auth_wall_desktop_profile" in html or "Sign Up | LinkedIn" in html:
                print("[!] LinkedIn redirected to AuthWall (session cookie may be expired)", file=sys.stderr)
                return None

            # Followers match
            follower_match = re.search(r"([\d,.]+)\s+followers", html, re.IGNORECASE)
            followers = None
            if follower_match:
                followers = int(follower_match.group(1).replace(",", "").replace(".", ""))

            # Connections match
            conn_match = re.search(r"([\d,+]+)\s+connections", html, re.IGNORECASE)
            connections = conn_match.group(1) if conn_match else "500+"

            # Member name / title
            title_match = re.search(r"<title>(.*?)</title>", html)
            title = title_match.group(1) if title_match else ""

            return {
                "followers": followers,
                "connections": connections,
                "title": title,
                "url": PROFILE_URL,
            }
    except Exception as e:
        print(f"[!] Request error: {e}", file=sys.stderr)
        return None


def main():
    parser = argparse.ArgumentParser(description="Scrape LinkedIn followers for yust.dev")
    parser.add_argument("--cookie", help="li_at session cookie", default=None)
    parser.add_argument("--save-env", action="store_true", help="Save extracted cookie to .env")
    parser.add_argument("--sync", action="store_true", help="Sync follower count to src/data/linkedin.json")
    args = parser.parse_args()

    cookie = args.cookie or os.environ.get("LINKEDIN_LI_AT_COOKIE")

    if not cookie:
        print("[*] Checking local browser stores for LinkedIn session cookie...")
        cookie = get_cookie_from_browser()
        if cookie:
            print("[+] Found active session cookie in local browser!")

    if not cookie:
        print("[-] No li_at cookie found. Please pass --cookie or set LINKEDIN_LI_AT_COOKIE.", file=sys.stderr)
        sys.exit(1)

    print(f"[*] Scraping {PROFILE_URL} ...")
    res = scrape_linkedin(cookie)
    if not res or res.get("followers") is None:
        print("[-] Failed to extract follower count from LinkedIn.", file=sys.stderr)
        sys.exit(1)

    print("\n==========================================")
    print(f"  Profile:     {res.get('title')}")
    print(f"  Followers:   {res.get('followers'):,} ({res.get('followers')})")
    print(f"  Connections: {res.get('connections')}")
    print("==========================================\n")

    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    if args.sync:
        json_path = os.path.join(root_dir, "src", "data", "linkedin.json")
        os.makedirs(os.path.dirname(json_path), exist_ok=True)
        data = {
            "followers": res["followers"],
            "connections": res["connections"],
            "updatedAt": datetime.now(timezone.utc).isoformat(),
        }
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
            f.write("\n")
        print(f"[+] Successfully synced LinkedIn stats to {json_path}")

    if args.save_env or not os.path.exists(os.path.join(root_dir, ".env")):
        env_path = os.path.join(root_dir, ".env")
        lines = []
        if os.path.exists(env_path):
            with open(env_path, "r", encoding="utf-8") as f:
                lines = f.readlines()

        new_lines = [l for l in lines if not l.startswith("LINKEDIN_LI_AT_COOKIE=")]
        new_lines.append(f"LINKEDIN_LI_AT_COOKIE={cookie}\n")

        with open(env_path, "w", encoding="utf-8") as f:
            f.writelines(new_lines)
        print(f"[+] Saved LINKEDIN_LI_AT_COOKIE to {env_path}")


if __name__ == "__main__":
    main()

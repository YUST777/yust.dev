import type { ImgHTMLAttributes } from "react";

export default function CertificateIcon({
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src="/static/icons/certificates.svg"
      alt={props.alt ?? "Certificates"}
      className={className}
      {...props}
    />
  );
}

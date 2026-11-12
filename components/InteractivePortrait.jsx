import Image from 'next/image';

export default function InteractivePortrait() {
  return (
    <div className="hero-portrait-figure">
      <Image
        src="/dipesh-hero-v3.webp"
        id="primary-profile-image"
        itemProp="image"
        alt="Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus, standing with arms crossed"
        width={540}
        height={686}
        loading="eager"
        priority
        fetchPriority="high"
        unoptimized
        className="hero-portrait-image"
      />
    </div>
  );
}

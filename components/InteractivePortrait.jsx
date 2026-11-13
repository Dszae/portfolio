import Image from 'next/image';

export default function InteractivePortrait() {
  return (
    <div className="hero-portrait-figure">
      <Image
        src="/dipesh-sapkota-hero.webp"
        id="primary-profile-image"
        title="Dipesh Sapkota"
        itemProp="image"
        alt="Dipesh Sapkota, Computer Engineering student at IOE Thapathali Campus in Kathmandu, Nepal"
        width={582}
        height={799}
        loading="eager"
        priority
        fetchPriority="high"
        unoptimized
        className="hero-portrait-image"
      />
    </div>
  );
}

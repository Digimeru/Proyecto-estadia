import "./FeatureCard.css";

interface FeatureCardProps {
  title: string;
}

function FeatureCard({ title }: FeatureCardProps) {
  return (
    <div className="feature-card">
      <span className="feature-dot" />
      <span className="feature-title">{title}</span>
    </div>
  );
}

export default FeatureCard;

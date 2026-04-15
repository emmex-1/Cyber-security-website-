import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  light?: boolean;
  center?: boolean;
}

const SectionHeading = ({ label, title, description, light, center = true }: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-12`}
    >
      {label && (
        <span className="inline-block text-white font-heading text-sm font-semibold uppercase tracking-widest mb-3">
          {label}
        </span>
      )}
      <h2 className={`font-heading text-3xl md:text-4xl font-bold mb-4 ${light ? "text-white" : "text-foreground"}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg leading-relaxed ${light ? "text-white" : "text-muted-foreground"}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;

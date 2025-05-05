import ContentLoader from 'react-content-loader';
import { motion } from 'framer-motion';

const TestimonialCardLoader = (props: any) => (
  <motion.div
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount: 0.6 }}
    className="bg-white impact-testimonial xl:min-w-[356px] rounded-2xl xl:rounded-[20px] 3xl:rounded-3xl p-4 md:p-5 xl:p-7 3xl:p-10"
  >
    <ContentLoader
      speed={2}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="w-full"
      {...props}
    >
      {/* User Details Section */}
      <rect x="0" y="0" rx="100" ry="100" width="80" height="80" /> {/* Avatar */}
      <rect x="90" y="10" rx="4" ry="4" width="120" height="20" /> {/* Name */}
      <rect x="90" y="40" rx="4" ry="4" width="100" height="16" /> {/* Designation */}
      
      {/* Testimonial Content */}
      <rect x="0" y="90" rx="4" ry="4" width="100%" height="16" />
      <rect x="0" y="110" rx="4" ry="4" width="100%" height="16" />
      <rect x="0" y="130" rx="4" ry="4" width="100%" height="16" />
      <rect x="0" y="150" rx="4" ry="4" width="80%" height="16" />
    </ContentLoader>
  </motion.div>
);

export default TestimonialCardLoader;
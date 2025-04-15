import ContentLoader from 'react-content-loader';

const CompanyCardLoader = (props: any) => (
  <ContentLoader
    viewBox="0 0 200 200"
    preserveAspectRatio="xMinYMin meet"
    className="w-full h-auto"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="10" ry="10" width="200" height="120" />
    <rect x="0" y="125" rx="10" ry="4" width="200" height="20" />
    <rect x="0" y="145" rx="10" ry="4" width="200" height="20" />
  </ContentLoader>
);

export default CompanyCardLoader;

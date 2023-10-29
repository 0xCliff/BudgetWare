import clsx from 'clsx';

const Skeleton: React.FC<SkeletonProps> = ({ times, classNames }) => {
  const renderedBoxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div
          key={i}
          className={clsx('relative overflow-hidden bg-gray-200 dark:bg-gray-600 rounded mb-2.5', classNames)}
        >
          <div
            className={clsx(
              'animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 dark:from-gray-600 via-white dark:via-gray-400 to-gray-200 dark:bg-gray-600',
              classNames
            )}
          />
        </div>
      );
    });

  return <>{renderedBoxes}</>;
};

export default Skeleton;

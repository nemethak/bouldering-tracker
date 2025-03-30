import { motion, PanInfo } from 'motion/react';
import { GradeModifier } from './Session';

const colors = ['white', 'blue', 'yellow', 'green', 'red', 'black'];

const getModifier = (offset: number) =>
  offset < 0 ? GradeModifier.PLUS : GradeModifier.MINUS;

export const SwipeableColorList = ({
  setSelectedGrade,
  setGradeModifier,
  setRetryId,
  setAttempts,
}: {
  setSelectedGrade: React.Dispatch<React.SetStateAction<string | null>>;
  setGradeModifier: React.Dispatch<React.SetStateAction<GradeModifier | null>>;
  setRetryId: React.Dispatch<React.SetStateAction<number | null>>;
  setAttempts: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const handleDragEnd = (color: string, info: PanInfo) => {
    const offset = info.offset.y;
    setSelectedGrade(color);
    setGradeModifier(getModifier(offset));
    setRetryId(null);
    setAttempts(1);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        {colors.map((color) => (
          <motion.div
            onClick={() => {
              setSelectedGrade(color);
              setGradeModifier(null);
              setRetryId(null);
              setAttempts(1);
            }}
            key={color}
            className="w-14 h-14 flex items-center justify-center rounded-xl border-1 border-gray-200 cursor-pointer"
            style={{ backgroundColor: color }}
            drag="y"
            dragElastic={0.2}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 15 }}
            whileDrag={{ cursor: 'grabbing', scaleY: 1.1 }}
            onDragEnd={(_, info) => handleDragEnd(color, info)}
          />
        ))}
      </div>
    </div>
  );
};

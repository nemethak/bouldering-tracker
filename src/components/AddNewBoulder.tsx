import { motion } from 'motion/react';
import { Boulder, GradeModifier } from './Session';

export const AddNewBoulder = ({
  selectedGrade,
  gradeModifier,
  attempts,
  retryId,
  previousBoulders,
  setSelectedGrade,
  setGradeModifier,
  setRetryId,
  setAttempts,
  setPreviousBoulders,
}: {
  selectedGrade: string;
  gradeModifier: GradeModifier | null;
  attempts: number;
  retryId: number | null;
  previousBoulders: Boulder[];
  setPreviousBoulders: React.Dispatch<React.SetStateAction<Boulder[]>>;
  setSelectedGrade: React.Dispatch<React.SetStateAction<string | null>>;
  setGradeModifier: React.Dispatch<React.SetStateAction<GradeModifier | null>>;
  setRetryId: React.Dispatch<React.SetStateAction<number | null>>;
  setAttempts: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: 0 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        if (info.offset.x < -100) {
          setSelectedGrade(null);
          setGradeModifier(null);
          setAttempts(1);
        }
      }}
      className="flex flex-col p-4 gap-1 bg-gray-100 rounded-2xl"
    >
      <div className="flex justify-between">
        <p>
          {selectedGrade}
          {gradeModifier}
        </p>
      </div>
      <p>attempt: {attempts}</p>
      <div className="flex justify-between">
        <button
          className="p-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-700 active:bg-blue-700"
          onClick={() => {
            if (retryId) {
              setPreviousBoulders(
                previousBoulders.map((boulder) => {
                  if (boulder.id === retryId) {
                    return {
                      ...boulder,
                      attempts: attempts,
                      completed: true,
                      timestamp: Date.now(),
                    };
                  }
                  return boulder;
                })
              );
              setRetryId(null);
              setSelectedGrade(null);
              setGradeModifier(null);
              setAttempts(1);
              return;
            }
            setPreviousBoulders([
              {
                id: previousBoulders.length + 1,
                session_id: 1,
                grade: selectedGrade,
                grade_modifier: gradeModifier,
                route_number: 1,
                completed: true,
                attempts: attempts,
                timestamp: Date.now(),
              },
              ...previousBoulders,
            ]);
            setSelectedGrade(null);
            setGradeModifier(null);
            setAttempts(1);
          }}
        >
          Completed
        </button>
        <button
          className="p-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-700 active:bg-blue-700"
          onClick={() => setAttempts(attempts + 1)}
        >
          Try again
        </button>
        <button
          className="p-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-700 active:bg-blue-700"
          onClick={() => {
            if (retryId) {
              setPreviousBoulders(
                previousBoulders.map((boulder) => {
                  if (boulder.id === retryId) {
                    return {
                      ...boulder,
                      attempts: attempts,
                      timestamp: Date.now(),
                    };
                  }
                  return boulder;
                })
              );
              setRetryId(null);
              setSelectedGrade(null);
              setGradeModifier(null);
              setAttempts(1);
              return;
            }
            setPreviousBoulders([
              {
                id: previousBoulders.length + 1,
                session_id: 1,
                grade: selectedGrade,
                grade_modifier: gradeModifier,
                route_number: 1,
                completed: false,
                attempts: attempts,
                timestamp: Date.now(),
              },
              ...previousBoulders,
            ]);
            setSelectedGrade(null);
            setGradeModifier(null);
            setAttempts(1);
          }}
        >
          Give up
        </button>
      </div>
    </motion.div>
  );
};

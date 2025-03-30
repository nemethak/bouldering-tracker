import { Boulder, GradeModifier } from './Session';

export const PreviousBoulders = ({
  previousBoulders,
  setSelectedGrade,
  setGradeModifier,
  setRetryId,
  setAttempts,
}: {
  previousBoulders: Boulder[];
  setSelectedGrade: React.Dispatch<React.SetStateAction<string | null>>;
  setGradeModifier: React.Dispatch<React.SetStateAction<GradeModifier | null>>;
  setRetryId: React.Dispatch<React.SetStateAction<number | null>>;
  setAttempts: React.Dispatch<React.SetStateAction<number>>;
}) => (
  /* TODO: make this scrollable */
  <div className="flex flex-col gap-5">
    {previousBoulders
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((boulder) => {
        return (
          <div
            key={boulder.id}
            className="flex col-span-3 p-4 bg-gray-100 rounded-2xl gap-5 justify-between"
          >
            <div className="flex gap-5">
              <p>{boulder.grade}</p>
              <p>{boulder.grade_modifier}</p>
              <p>{boulder.completed.toString()}</p>
              <p>{boulder.attempts}</p>
            </div>
            {!boulder.completed && (
              <button
                className="p-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-700 active:bg-blue-700"
                onClick={() => {
                  setRetryId(boulder.id);
                  setSelectedGrade(boulder.grade);
                  setGradeModifier(boulder.grade_modifier);
                  setAttempts(boulder.attempts + 1);
                }}
              >
                Retry
              </button>
            )}
          </div>
        );
      })}
  </div>
);

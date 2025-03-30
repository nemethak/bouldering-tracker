import { useState } from 'react';
import { SwipeableColorList } from './SwipeableColorList';
import { AddNewBoulder } from './AddNewBoulder';
import { PreviousBoulders } from './PreviousBoulders';

export const enum GradeModifier {
  PLUS = '+',
  MINUS = '-',
}

export interface Boulder {
  id: number;
  session_id: number;
  grade: string;
  grade_modifier: GradeModifier | null;
  route_number?: number;
  completed: boolean;
  attempts: number;
  timestamp: number;
}

export const Session = () => {
  const boulders: Boulder[] = [
    {
      id: 1,
      session_id: 1,
      grade: 'white',
      grade_modifier: null,
      route_number: 1,
      completed: true,
      attempts: 1,
      timestamp: Date.now(),
    },
  ];

  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [gradeModifier, setGradeModifier] = useState<GradeModifier | null>(
    null
  );
  const [retryId, setRetryId] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number>(1);
  const [previousBoulders, setPreviousBoulders] = useState<Boulder[]>(boulders);

  console.log(retryId);

  return (
    <>
      <h1 className="text-3xl p-3">Route tracker</h1>
      <div className="flex flex-col gap-5 p-5">
        <div>
          <SwipeableColorList
            setSelectedGrade={setSelectedGrade}
            setGradeModifier={setGradeModifier}
            setRetryId={setRetryId}
            setAttempts={setAttempts}
          />
        </div>
        {selectedGrade && (
          <AddNewBoulder
            selectedGrade={selectedGrade}
            gradeModifier={gradeModifier}
            attempts={attempts}
            retryId={retryId}
            previousBoulders={previousBoulders}
            setPreviousBoulders={setPreviousBoulders}
            setSelectedGrade={setSelectedGrade}
            setGradeModifier={setGradeModifier}
            setRetryId={setRetryId}
            setAttempts={setAttempts}
          />
        )}
        <PreviousBoulders
          previousBoulders={previousBoulders}
          setSelectedGrade={setSelectedGrade}
          setGradeModifier={setGradeModifier}
          setRetryId={setRetryId}
          setAttempts={setAttempts}
        />
      </div>
    </>
  );
};

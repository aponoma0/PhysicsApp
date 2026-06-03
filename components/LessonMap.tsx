import React from 'react';
import { Unit, Lesson } from '../types';
import { Lock, Star, Check, Play } from 'lucide-react';

interface LessonMapProps {
  units: Unit[];
  activeUnitId: string;
  onLessonClick: (lesson: Lesson) => void;
}

const LessonMap: React.FC<LessonMapProps> = ({ units, activeUnitId, onLessonClick }) => {
  const isImage = (icon: string) => icon.startsWith('http') || icon.startsWith('data:image');
  const colorStyles: Record<string, { node: string; text: string; ring: string; soft: string }> = {
    green: {
      node: 'bg-green-500 border-green-700',
      text: 'text-green-300',
      ring: 'ring-green-400/50',
      soft: 'bg-green-500/10 border-green-500/30'
    },
    pink: {
      node: 'bg-pink-500 border-pink-700',
      text: 'text-pink-300',
      ring: 'ring-pink-400/50',
      soft: 'bg-pink-500/10 border-pink-500/30'
    },
    yellow: {
      node: 'bg-yellow-500 border-yellow-700',
      text: 'text-yellow-300',
      ring: 'ring-yellow-400/50',
      soft: 'bg-yellow-500/10 border-yellow-500/30'
    },
    red: {
      node: 'bg-red-500 border-red-700',
      text: 'text-red-300',
      ring: 'ring-red-400/50',
      soft: 'bg-red-500/10 border-red-500/30'
    },
    orange: {
      node: 'bg-orange-500 border-orange-700',
      text: 'text-orange-300',
      ring: 'ring-orange-400/50',
      soft: 'bg-orange-500/10 border-orange-500/30'
    },
    blue: {
      node: 'bg-blue-500 border-blue-700',
      text: 'text-blue-300',
      ring: 'ring-blue-400/50',
      soft: 'bg-blue-500/10 border-blue-500/30'
    },
    purple: {
      node: 'bg-purple-500 border-purple-700',
      text: 'text-purple-300',
      ring: 'ring-purple-400/50',
      soft: 'bg-purple-500/10 border-purple-500/30'
    }
  };

  return (
    <div className="pb-32 pt-[calc(5rem+env(safe-area-inset-top))] px-4 flex flex-col items-center space-y-6">
      {units.map((unit) => (
        <div key={unit.id} className="w-full max-w-md">
          <div className={`mb-5 p-3 rounded-2xl border ${unit.id === activeUnitId ? colorStyles[unit.color]?.soft || 'bg-purple-500/10 border-purple-500/30' : 'bg-gray-900 border-gray-800'}`}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className={`text-base font-extrabold ${colorStyles[unit.color]?.text || 'text-purple-300'}`}>
                  {unit.title}
                </h2>
                <p className="text-gray-400 text-xs mt-0.5">{unit.description}</p>
              </div>
              {unit.id === activeUnitId && (
                <span className="shrink-0 rounded-full bg-white/10 border border-white/10 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white">
                  Current
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 relative pb-8">
             {/* Snake Layout Logic */}
            {unit.lessons.map((lesson, index) => {
              // Calculate offset for snake path
              const xOffset = Math.sin((index / 2) * Math.PI) * 52; // -52 to 52px
              const style = colorStyles[lesson.color] || colorStyles.green;
              
              const lockedClass = 'bg-gray-700 border-gray-600 grayscale opacity-70';
              const activeClass = lesson.locked ? lockedClass : style.node;
              const isCurrent = !lesson.locked && !lesson.completed;
              
              return (
                <div 
                  key={lesson.id} 
                  className="relative z-10 flex flex-col items-center w-36"
                  style={{ transform: `translateX(${xOffset}px)` }}
                >
                  {index > 0 && (
                    <div className="absolute -top-8 left-1/2 h-8 w-1 -translate-x-1/2 bg-gray-800 rounded-full" />
                  )}

                  {/* Floating Stars for completed lessons */}
                  {lesson.completed && (
                     <div className="absolute -top-2 right-6 z-20 flex bg-yellow-400 text-black text-xs font-extrabold px-2 py-0.5 rounded-full border border-yellow-600 shadow-sm">
                        <Star size={10} className="fill-black mr-1" /> Done
                     </div>
                  )}

                  {isCurrent && (
                    <div className="mb-2 rounded-full bg-white text-gray-950 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide shadow-lg">
                      Start here
                    </div>
                  )}

                  <button
                    onClick={() => !lesson.locked && onLessonClick(lesson)}
                    disabled={lesson.locked}
                    aria-label={`${lesson.locked ? 'Locked lesson' : 'Start lesson'}: ${lesson.title}`}
                    className={`
                      w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-xl 
                      border-b-8 transition-all active:border-b-0 active:translate-y-2
                      ${activeClass} ${isCurrent ? `ring-4 ${style.ring} animate-pulse` : ''} overflow-hidden
                    `}
                  >
                    {lesson.locked ? (
                      <Lock className="text-gray-400 w-8 h-8" />
                    ) : lesson.completed ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <span className="opacity-50 flex items-center justify-center w-full h-full">
                           {isImage(lesson.icon) ? (
                              <img src={lesson.icon} alt={lesson.title} className="w-10 h-10 object-contain" />
                           ) : (
                              lesson.icon
                           )}
                        </span>
                        <Check className="absolute inset-0 m-auto text-white w-10 h-10 drop-shadow-md stroke-[3]" />
                      </div>
                    ) : isCurrent ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <span className="opacity-70 flex items-center justify-center w-full h-full">
                          {isImage(lesson.icon) ? (
                            <img src={lesson.icon} alt={lesson.title} className="w-10 h-10 object-contain drop-shadow-md" />
                          ) : (
                            lesson.icon
                          )}
                        </span>
                        <Play className="absolute inset-0 m-auto text-white w-9 h-9 fill-white drop-shadow-md" />
                      </div>
                    ) : (
                      <span className="flex items-center justify-center w-full h-full">
                          {isImage(lesson.icon) ? (
                              <img src={lesson.icon} alt={lesson.title} className="w-10 h-10 object-contain drop-shadow-md" />
                           ) : (
                              lesson.icon
                           )}
                      </span>
                    )}
                  </button>
                  
                  {/* Lesson Title Label */}
                  <div className="mt-3 w-36 text-center">
                    <span className={`inline-block max-w-full text-xs leading-tight font-extrabold px-2.5 py-1.5 rounded-lg border 
                      ${lesson.locked 
                        ? 'text-gray-500 bg-gray-900/50 border-gray-800' 
                        : lesson.completed
                          ? 'text-green-200 bg-green-950/70 border-green-800/70'
                          : 'text-gray-100 bg-gray-900/90 border-gray-700'
                      }`}
                    >
                       {lesson.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonMap;

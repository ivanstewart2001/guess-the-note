"use client";
import { useEffect, useRef, useState } from "react";
import {
  Renderer,
  Stave,
  StaveNote,
  Voice,
  Formatter,
  RenderContext,
  Accidental,
} from "vexflow";
import styles from "./page.module.css";

export default function Home() {
  const [context, setContext] = useState<RenderContext>();
  const [stave, setStave] = useState<Stave>();
  const myInterval = useRef<NodeJS.Timeout | null>(null);
  const [onStartScreen, setOnStartScreen] = useState<boolean>(true);
  const [onGameOverScreen, setOnGameOverScreen] = useState<boolean>(false);
  const [noteChangeFrequency, setNoteChangeFrequency] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [questionCount, setQuestionCount] = useState<number>(0);
  const questionCountRef = useRef(questionCount);
  const [playGameClicked, setPlayGameClicked] = useState<boolean>(false);
  const playGameClickedRef = useRef(playGameClicked);
  const [startGameClicked, setStartGameClicked] = useState<boolean>(false);
  const startGameClickedRef = useRef(startGameClicked);
  const [includeAccidentals, setIncludeAccidentals] = useState<boolean>(false);
  const [countDown, setCountdown] = useState<number>(5);
  const [countdownIntervalId, setCountdownIntervalId] =
    useState<NodeJS.Timeout | null>(null);

  const notesWithAccidentals = [
    new StaveNote({ clef: "treble", keys: ["b/3"], duration: "w" }).addModifier(
      new Accidental("b")
    ),
    new StaveNote({ clef: "treble", keys: ["b/3"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["c/4"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["c/4"], duration: "w" }).addModifier(
      new Accidental("#")
    ),
    new StaveNote({ clef: "treble", keys: ["d/4"], duration: "w" }).addModifier(
      new Accidental("b")
    ),
    new StaveNote({ clef: "treble", keys: ["d/4"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["d/4"], duration: "w" }).addModifier(
      new Accidental("#")
    ),
    new StaveNote({ clef: "treble", keys: ["e/4"], duration: "w" }).addModifier(
      new Accidental("b")
    ),
    new StaveNote({ clef: "treble", keys: ["e/4"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["f/4"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["f/4"], duration: "w" }).addModifier(
      new Accidental("#")
    ),
    new StaveNote({ clef: "treble", keys: ["g/4"], duration: "w" }).addModifier(
      new Accidental("b")
    ),
    new StaveNote({ clef: "treble", keys: ["g/4"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["g/4"], duration: "w" }).addModifier(
      new Accidental("#")
    ),
    new StaveNote({ clef: "treble", keys: ["a/4"], duration: "w" }).addModifier(
      new Accidental("b")
    ),
    new StaveNote({ clef: "treble", keys: ["a/4"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["a/4"], duration: "w" }).addModifier(
      new Accidental("#")
    ),
    new StaveNote({ clef: "treble", keys: ["b/4"], duration: "w" }).addModifier(
      new Accidental("b")
    ),
    new StaveNote({ clef: "treble", keys: ["b/4"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["c/5"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["c/5"], duration: "w" }).addModifier(
      new Accidental("#")
    ),
    new StaveNote({ clef: "treble", keys: ["d/5"], duration: "w" }).addModifier(
      new Accidental("b")
    ),
    new StaveNote({ clef: "treble", keys: ["d/5"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["d/5"], duration: "w" }).addModifier(
      new Accidental("#")
    ),
    new StaveNote({ clef: "treble", keys: ["e/5"], duration: "w" }).addModifier(
      new Accidental("b")
    ),
    new StaveNote({ clef: "treble", keys: ["e/5"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["f/5"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["f/5"], duration: "w" }).addModifier(
      new Accidental("#")
    ),
    new StaveNote({ clef: "treble", keys: ["g/5"], duration: "w" }).addModifier(
      new Accidental("b")
    ),
    new StaveNote({ clef: "treble", keys: ["g/5"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["g/5"], duration: "w" }).addModifier(
      new Accidental("#")
    ),
    new StaveNote({ clef: "treble", keys: ["a/5"], duration: "w" }).addModifier(
      new Accidental("b")
    ),
    new StaveNote({ clef: "treble", keys: ["a/5"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["a/5"], duration: "w" }).addModifier(
      new Accidental("#")
    ),
    new StaveNote({ clef: "treble", keys: ["b/5"], duration: "w" }).addModifier(
      new Accidental("b")
    ),
    new StaveNote({ clef: "treble", keys: ["b/5"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["c/6"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["c/6"], duration: "w" }).addModifier(
      new Accidental("#")
    ),
    new StaveNote({ clef: "treble", keys: ["d/6"], duration: "w" }).addModifier(
      new Accidental("b")
    ),
    new StaveNote({ clef: "treble", keys: ["d/6"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["d/6"], duration: "w" }).addModifier(
      new Accidental("#")
    ),
    new StaveNote({ clef: "treble", keys: ["e/6"], duration: "w" }).addModifier(
      new Accidental("b")
    ),
    new StaveNote({ clef: "treble", keys: ["e/6"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["f/6"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["f/6"], duration: "w" }).addModifier(
      new Accidental("#")
    ),
  ];

  const notesWithoutAccidentals = [
    new StaveNote({ clef: "treble", keys: ["b/3"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["c/4"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["d/4"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["e/4"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["f/4"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["g/4"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["a/4"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["b/4"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["c/5"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["d/5"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["e/5"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["f/5"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["g/5"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["a/5"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["b/5"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["c/6"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["d/6"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["e/6"], duration: "w" }),
    new StaveNote({ clef: "treble", keys: ["f/6"], duration: "w" }),
  ];

  useEffect(() => {
    // Create an SVG renderer and attach it to the DIV element named "boo".
    let div = document.getElementById("output");
    const targetDiv = document.getElementById("gameScreen");

    if ((onGameOverScreen || playGameClicked || onStartScreen) && div) {
      div.remove();
      return;
    } else {
      if (playGameClicked && !div && targetDiv) {
        div = document.createElement("div");
        div.id = "output";
        div.className = styles.staveDiv;

        // Append the new div element to the DOM
        targetDiv.insertBefore(div, targetDiv.firstChild);

        const renderer = new Renderer(div as any, Renderer.Backends.SVG);

        // Configure the rendering context.
        renderer.resize(window.innerWidth / 3, window.innerHeight / 4);
        const tempContext = renderer.getContext();

        // Create a stave of width 400 at position 10, 40 on the canvas.
        const tempStave = new Stave(10, 40, window.innerWidth / 3);

        // Add a clef and time signature.
        tempStave.addClef("treble").addTimeSignature("4/4");

        // Connect it to the rendering context and draw!
        tempStave.setContext(tempContext).draw();

        setContext(tempContext);
        setStave(tempStave);
      }
    }
  }, [onStartScreen, onGameOverScreen, playGameClicked]);

  function start() {
    const id = setInterval(() => {
      setCountdown((count) => {
        if (count === 0) {
          clearInterval(id);
          setCountdownIntervalId(null);

          if (stave && context) {
            setStartGameClicked(true);
            startGameClickedRef.current = true;

            if (
              questionCountRef.current < numberOfQuestions &&
              startGameClickedRef.current
            ) {
              context.clear();

              // Create a new stave
              const newStave = new Stave(10, 40, window.innerWidth / 3);

              // Add a clef and time signature
              newStave.addClef("treble").addTimeSignature("4/4");

              // Set the context for the stave
              newStave.setContext(context);

              // Draw the stave
              newStave.draw();

              let notes;

              if (includeAccidentals) {
                notes = notesWithAccidentals;
              } else {
                notes = notesWithoutAccidentals;
              }

              const randomIndex = Math.floor(Math.random() * notes.length);
              const randomNote = notes[randomIndex];
              console.log(randomNote.getKeys());

              const voices = [
                new Voice({
                  num_beats: 4,
                  beat_value: 4,
                }).addTickable(randomNote),
              ];

              // Format and justify the notes to 400 pixels.
              new Formatter().joinVoices(voices).format(voices, 350);

              // Render voices.
              voices.forEach(function (v) {
                v.draw(context, newStave);
              });

              setStave(newStave);
              setQuestionCount((prevCount) => {
                questionCountRef.current = prevCount + 1;
                return prevCount + 1;
              });
            } else {
              end();
            }

            const interval = setInterval(() => {
              if (
                questionCountRef.current < numberOfQuestions &&
                startGameClickedRef.current
              ) {
                context.clear();

                // Create a new stave
                const newStave = new Stave(10, 40, window.innerWidth / 3);

                // Add a clef and time signature
                newStave.addClef("treble").addTimeSignature("4/4");

                // Set the context for the stave
                newStave.setContext(context);

                // Draw the stave
                newStave.draw();

                let notes;

                if (includeAccidentals) {
                  notes = notesWithAccidentals;
                } else {
                  notes = notesWithoutAccidentals;
                }

                const randomIndex = Math.floor(Math.random() * notes.length);
                const randomNote = notes[randomIndex];
                console.log(randomNote.getKeys());

                const voices = [
                  new Voice({
                    num_beats: 4,
                    beat_value: 4,
                  }).addTickable(randomNote),
                ];

                // Format and justify the notes to 400 pixels.
                new Formatter().joinVoices(voices).format(voices, 350);

                // Render voices.
                voices.forEach(function (v) {
                  v.draw(context, newStave);
                });

                setStave(newStave);
                setQuestionCount((prevCount) => {
                  questionCountRef.current = prevCount + 1;
                  return prevCount + 1;
                });
              } else {
                end();
                return;
              }
            }, noteChangeFrequency * 1000);

            myInterval.current = interval;
          }

          return count;
        }
        return count - 1;
      });
    }, 1000);
    setCountdownIntervalId(id);
  }

  function end() {
    if (myInterval.current) {
      clearInterval(myInterval.current);
      endGame();
    }
  }

  function reset() {
    setCountdown(5);
    setOnStartScreen(true);
    setOnGameOverScreen(false);
    setNumberOfQuestions(0);
    setNoteChangeFrequency(0);
    setQuestionCount(0);
    setPlayGameClicked(false);
    setStartGameClicked(false);
    setIncludeAccidentals(false);
    startGameClickedRef.current = false;
    questionCountRef.current = 0;
    myInterval.current = null;
  }

  function endGame() {
    setCountdown(5);
    setOnGameOverScreen(true);
    setOnStartScreen(false);
    setNumberOfQuestions(0);
    setNoteChangeFrequency(0);
    setQuestionCount(0);
    setPlayGameClicked(false);
    setStartGameClicked(false);
    setIncludeAccidentals(false);
    startGameClickedRef.current = false;
    questionCountRef.current = 0;
    myInterval.current = null;
  }

  if (onStartScreen) {
    return (
      <div className={styles.container}>
        <h1>Guess the Note</h1>

        <div>
          <label htmlFor="noteChangeFrequency">
            Note Change Frequency (in seconds):
          </label>
          <input
            type="number"
            min={0}
            id="noteChangeFrequency"
            value={noteChangeFrequency}
            onChange={(e) => setNoteChangeFrequency(Number(e.target.value))}
          />
          <br />
          <label htmlFor="numberOfQuestions">Number of Questions:</label>
          <input
            type="number"
            min={0}
            id="numberOfQuestions"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
          />
          <br />
          <label htmlFor="includeAccidentals">Include Accidentals:</label>
          <input
            type="checkbox"
            id="includeAccidentals"
            checked={includeAccidentals}
            onChange={(e) => setIncludeAccidentals(e.target.checked)}
          />
        </div>

        <button
          className={styles.playGameButton}
          onClick={() => {
            if (
              (!noteChangeFrequency || noteChangeFrequency < 0) &&
              onStartScreen
            ) {
              window.alert("Note Change Frequency must be greater than 0");
              setPlayGameClicked(false);
              return;
            }
            if (
              (!numberOfQuestions || numberOfQuestions < 0) &&
              onStartScreen
            ) {
              window.alert("Number of Questions must be greater than 0");
              setPlayGameClicked(false);
              return;
            }
            setPlayGameClicked(true);
            setOnStartScreen(false);
          }}
        >
          Play Game
        </button>
      </div>
    );
  } else if (onGameOverScreen) {
    return (
      <div className={styles.container}>
        <h1>Game Over!</h1>
        <button onClick={reset} className={styles.restartGameButton}>
          Play Again
        </button>
      </div>
    );
  } else {
    return (
      <div className={styles.container} id="gameScreen">
        {countDown > 0 && <h1>{countDown}</h1>}
        <div>
          {" "}
          {!!document.getElementById("output") ? (
            <div className={styles.gameContainer}>
              {" "}
              {questionCount > 0 && <h1>Question #{questionCount}</h1>}
              <div className={styles.buttonsDiv}>
                <button
                  className={styles.goBackButton}
                  onClick={reset}
                  disabled={!!countdownIntervalId}
                >
                  Go Back
                </button>
                <button
                  className={styles.startButton}
                  onClick={start}
                  disabled={!!countdownIntervalId}
                >
                  Start Game
                </button>
                <button
                  className={styles.endButton}
                  onClick={end}
                  disabled={!!countdownIntervalId}
                >
                  End Game
                </button>
              </div>
            </div>
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    );
  }
}

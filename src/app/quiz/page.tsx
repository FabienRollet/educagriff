"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

type QuestionOption = {
  id: number;
  text: string;
  nextQuestionId: number | null;
  result: string | null;
  questionId: number;
};

type Question = {
  id: number;
  text: string;
  options: QuestionOption[];
};

export default function Quiz() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [result, setResult] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/quiz");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des questions");
        }
        const data = await response.json();
        console.log("Questions reçues:", data);
        setQuestions(data);

        // Vérifier si les questions ont des IDs valides
        const questionIds = data.map((q: Question) => q.id);
        const uniqueIds = new Set(questionIds);
        if (questionIds.length !== uniqueIds.size) {
          console.warn("Attention: IDs de questions en double détectés");
        }

        // Vérifier si les nextQuestionId sont valides
        const invalidNextIds = [];
        data.forEach((q: Question) => {
          q.options.forEach((option) => {
            if (
              option.nextQuestionId !== null &&
              !questionIds.includes(option.nextQuestionId)
            ) {
              invalidNextIds.push({
                questionId: q.id,
                optionId: option.id,
                invalidNextId: option.nextQuestionId,
              });
            }
          });
        });

        if (invalidNextIds.length > 0) {
          console.warn(
            "Options avec nextQuestionId invalides:",
            invalidNextIds
          );
          setDebugInfo(
            `IDs de questions invalides trouvés: ${JSON.stringify(
              invalidNextIds
            )}`
          );
        }
      } catch (err) {
        console.error("Erreur:", err);
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleStart = () => {
    setShowIntro(false);
    setCurrentQuestionIndex(0);
  };

  const handleAnswer = (option: QuestionOption) => {
    console.log("Option sélectionnée:", option);

    if (option.result) {
      console.log("Affichage du résultat:", option.result);
      setResult(option.result);
      setCurrentQuestionIndex(-1);
    } else if (option.nextQuestionId !== null) {
      console.log(
        "Recherche de la prochaine question avec ID:",
        option.nextQuestionId
      );
      // Trouver l'index de la question dans le tableau en fonction de son ID
      const nextQuestionIndex = questions.findIndex(
        (q) => q.id === option.nextQuestionId
      );
      console.log("Index de la prochaine question:", nextQuestionIndex);

      if (nextQuestionIndex !== -1) {
        setCurrentQuestionIndex(nextQuestionIndex);
      } else {
        const errorMsg = `Question introuvable avec l'ID: ${option.nextQuestionId}`;
        console.error(errorMsg);
        setDebugInfo(errorMsg);

        // Afficher les IDs disponibles pour aider au débogage
        const availableIds = questions.map((q) => q.id).join(", ");
        setDebugInfo(
          (prev) => `${prev || ""}\nIDs disponibles: ${availableIds}`
        );
      }
    } else {
      console.error("L'option n'a ni résultat ni question suivante");
    }
  };

  const handleRestart = () => {
    setShowIntro(true);
    setCurrentQuestionIndex(-1);
    setResult(null);
    setDebugInfo(null);
  };

  const getCurrentQuestionData = () => {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      return questions[currentQuestionIndex];
    }
    return null;
  };

  if (loading) {
    return (
      <main
        className={`min-h-screen py-16 transition-colors duration-300 ${
          resolvedTheme === "light"
            ? "bg-gradient-to-b from-white to-orange-50 text-gray-900"
            : "bg-gradient-to-b from-black to-gray-900 text-gray-100"
        }`}
      >
        <div className="max-w-3xl mx-6 md:mx-auto p-8 rounded-2xl shadow-lg text-center">
          <p>Chargement du quiz...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main
        className={`min-h-screen py-16 transition-colors duration-300 ${
          resolvedTheme === "light"
            ? "bg-gradient-to-b from-white to-orange-50 text-gray-900"
            : "bg-gradient-to-b from-black to-gray-900 text-gray-100"
        }`}
      >
        <div className="max-w-3xl mx-6 md:mx-auto p-8 rounded-2xl shadow-lg text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </main>
    );
  }

  const currentQuestion = getCurrentQuestionData();

  return (
    <main
      className={`min-h-screen py-16 transition-colors duration-300 ${
        resolvedTheme === "light"
          ? "bg-gradient-to-b from-white to-orange-50 text-gray-900"
          : "bg-gradient-to-b from-black to-gray-900 text-gray-100"
      }`}
    >
      <div
        className={`max-w-3xl mx-6 md:mx-auto p-8 rounded-2xl shadow-lg ${
          resolvedTheme === "light"
            ? "border border-gray-300 bg-white shadow-lg text-gray-800"
            : "border border-orange-400 backdrop-blur-md bg-gray-700/70 shadow-[0_0_20px_rgba(255,255,255,0.15)] text-gray-100"
        }`}
      >
        {showIntro ? (
          <div className="text-center space-y-6">
            <h1
              className={`text-3xl font-bold ${
                resolvedTheme === "light"
                  ? "text-orange-600"
                  : "text-orange-400"
              }`}
            >
              Quiz de Découverte
            </h1>
            <p className="text-lg">
              Ce quiz vous aidera à identifier la prestation la plus adaptée à
              vos besoins. Répondez aux questions pour découvrir nos services
              personnalisés.
            </p>
            <button
              onClick={handleStart}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                resolvedTheme === "light"
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-orange-400 hover:bg-orange-500 text-gray-900"
              }`}
            >
              Commencer
            </button>
          </div>
        ) : currentQuestion && !result ? (
          <div className="space-y-6">
            <h2
              className={`text-2xl font-semibold ${
                resolvedTheme === "light"
                  ? "text-orange-600"
                  : "text-orange-400"
              }`}
            >
              Question {currentQuestionIndex + 1} (ID: {currentQuestion.id})
            </h2>
            <p className="text-xl">{currentQuestion.text}</p>
            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-4 text-left rounded-lg transition-all duration-300 ${
                    resolvedTheme === "light"
                      ? "bg-gray-100 hover:bg-orange-100 border border-gray-200"
                      : "bg-gray-800 hover:bg-orange-900/30 border border-gray-700"
                  }`}
                >
                  {option.text}
                  {process.env.NODE_ENV === "development" && (
                    <span className="block text-xs text-gray-500 mt-1">
                      {option.nextQuestionId
                        ? `→ Question ${option.nextQuestionId}`
                        : option.result
                        ? `→ ${option.result}`
                        : "→ Pas de suite"}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : result ? (
          <div className="text-center space-y-6">
            <h2
              className={`text-2xl font-semibold ${
                resolvedTheme === "light"
                  ? "text-orange-600"
                  : "text-orange-400"
              }`}
            >
              Résultat
            </h2>
            <p className="text-xl">{result}</p>
            <button
              onClick={handleRestart}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                resolvedTheme === "light"
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-orange-400 hover:bg-orange-500 text-gray-900"
              }`}
            >
              Recommencer
            </button>
          </div>
        ) : null}

        {debugInfo && process.env.NODE_ENV === "development" && (
          <div className="mt-8 p-4 border border-red-300 bg-red-50 text-red-800 rounded-lg">
            <h3 className="font-bold">Informations de débogage:</h3>
            <pre className="whitespace-pre-wrap text-sm mt-2">{debugInfo}</pre>
            <div className="mt-2">
              <h4 className="font-semibold">IDs de questions disponibles:</h4>
              <ul className="list-disc pl-5 mt-1">
                {questions.map((q) => (
                  <li key={q.id}>
                    Question {q.id}: {q.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

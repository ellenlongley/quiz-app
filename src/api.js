export async function fetchQuiz() {
  const response = await fetch(
    'https://opentdb.com/api.php?amount=5&type=multiple&difficulty=easy'
  );
  const jsonData = await response.json();
  // add an id onto each result and merge answers
  const results = jsonData.results.map((result, i) => {
    // Had a format that wasn't easy to work with, so merging incorrect_answers and correct_answer into one answers array
    return {
      ...result,
      id: i,
      answers: [...result.incorrect_answers, result.correct_answer],
    };
  });
  return results;
}

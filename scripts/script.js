/* ======================================================
   Load all lesson levels from API
====================================================== */
const loadData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/levels/all",
  );
  const data = await res.json();
  displayData(data.data);
};

/* ======================================================
   Remove 'active' class from all lesson buttons
====================================================== */
const removeActive = () => {
  const lessonBtns = document.querySelectorAll(".lesson-btn");
  lessonBtns.forEach((btn) => btn.classList.remove("active"));
};

/* ======================================================
   Load words of a specific lesson by lesson ID
====================================================== */
const loadLessonWords = async (id) => {
  manageSpnnier(true);  //start loader....
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  removeActive(); //remove active class
  const activeBtn = document.getElementById(`lesson-btn-${id}`);
  activeBtn.classList.add("active");
  displayLessons(data.data);
};

/* ======================================================
   Load single word details by word ID
====================================================== */
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.data);
};

/* ======================================================
   Display word details inside modal
====================================================== */
const displayDetails = (details) => {
  const { word, meaning, pronunciation, sentence, partsOfSpeech, synonyms } =
    details;

  const container = document.getElementById("modal-container");
  document.getElementById("my_modal_5").showModal();

  container.innerHTML = `
    <div>
      <h2 class="text-3xl font-bold">
        ${word} (<i class="fa-solid fa-microphone-lines"></i> :${pronunciation})
      </h2>
    </div>

    <div>
      <h2 class="text-lg font-semibold">Meaning</h2>
      <p class="font-bangla">${meaning}</p>
    </div>

    <div>
      <h2 class="text-lg font-semibold">Example</h2>
      <p>${sentence}</p>
    </div>

    <div class="grid space-y-2">
      <h2 class="text-lg font-semibold font-bangla">সমার্থক শব্দ গুলো</h2>
      <div class="flex space-x-2">
        ${synonyms
          .map(
            (el) =>
              `<span class="btn w-fit bg-[#1A91FF10] hover:bg-[#1A91FF80]">${el}</span>`,
          )
          .join(" ")}
      </div>
    </div>
  `;
};

/* ======================================================
   Spinner control function (show / hide)
====================================================== */
const manageSpnnier = (stutes) => {
  if (stutes === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("words-container").classList.add("hidden");
  } else {
    document.getElementById("words-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

/* ======================================================
   Display all words of a lesson
====================================================== */
const displayLessons = (datas) => {

  const wordsContainer = document.getElementById("words-container");
  wordsContainer.innerHTML = null;
  if (datas.length === 0) {
    wordsContainer.innerHTML = `
      <div class="text-center font-bangla col-span-full py-6 space-y-6">
        <div>
          <i class="fa-solid text-gray-500 text-8xl fa-triangle-exclamation"></i>
        </div>
        <p class="text-xl">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-black text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
    `;
    manageSpnnier(false);
    return;
  }

  datas.forEach((word) => {
    const dataDiv = document.createElement("div");

    dataDiv.innerHTML = `
      <div class="bg-white h-fit box-border rounded-xl shadow-sm m-2 text-center py-5 pt-10 px-5">
        <h2 class="text-3xl font-bold mb-2">
          ${word.word ? word.word : "শব্দ পাওয়া যাই নি"}
        </h2>

        <p class="text-xl text-gray-600">Meaning / Pronunciation</p>

        <p class="text-xl font-semibold text-gray-500 py-4 font-bangla">
          ${word.meaning ? word.meaning : "অর্থ পাওয়া যাই নি"} /
          ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যাই নি"}
        </p>

        <div class="flex my-2 items-end justify-between">
          <button
            onclick="loadWordDetail(${word.id})"
            class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>

          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;

    wordsContainer.append(dataDiv);
  });
  manageSpnnier(false);
};

/* ======================================================
   Display lesson buttons
====================================================== */
const displayData = (levels) => {
  const laverContainer = document.getElementById("lavel-container");
  laverContainer.innerHTML = null;

  levels.forEach((lesson) => {
    const btnDiv = document.createElement("div");

    btnDiv.innerHTML = `
      <div class="inline-block group relative">
        <button
          id="lesson-btn-${lesson.level_no}"
          onclick="loadLessonWords(${lesson.level_no})"
          class="btn btn-outline btn-primary lesson-btn">
          <i class="fa-solid fa-book-open"></i>
          Lesson ${lesson.level_no}
        </button>

        <span class="absolute -top-8 left-5/8 -translate-x-1/2
          bg-white font-semibold text-black text-xs px-2 py-1 rounded
          opacity-0 group-hover:opacity-100 transition duration-200">
          ${lesson.lessonName}
        </span>
      </div>
    `;

    laverContainer.append(btnDiv);
  });
};

/* ======================================================
   Initial call
====================================================== */
loadData();

import React from "react";

function InfoModal({ taskTitle, closeModal }) {
  const taskInfo = () => {
    switch (taskTitle) {
      case "Posprzątanie kuwety":
        return "Posprzątanie kuwety uważa się za zaliczone gdy: W kuwecie nie znajdują się żadne drobinki odchodów bądz moczu, podłoga jest odkurzona i nie ma na niej ziarenek żwirku, żwirek jest wyrzucony.";
      case "Posprzątanie kuchni":
        return "Posprzątanie kuchni uważa się za zaliczone gdy: Blaty zostały umyte, zmywarka załadowana (oraz rozładowana jeżeli jest potrzeba), a zlew oczyszczony został z resztek jedzenia.";
      case "Ogarnięcie Pokoju":
        return "Ogarnięcie pokoju uważa się za zaliczone gdy: Wszystkie śmieci zostały podniesione z podłogi, na biurkach nie ma naczyń ani śmieci. Jest to Zadanie które musi zostać zaliczone przed pójsciem do szkoły ";
      case "Pościelenie łóżka":
        return "Tego chyba nie muszę opisywać. Musi być zaliczone przed wyjściem do szkoły";
      case "Posprzątanie małej łazienki":
        return "Popsprzątanie małej łazienki uważa się za zaliczone gry: Toaleta zostanie umyta(Muszla umyta z zewnątrz i wewnątrz, Deski toaletowe umytę oraz Plastikowa osłonka dookoła przycisku spłukiwania wytarta z kurzu.) Lustro zostanie umytę i wytartę ręcznikami papierowymi aby nie powodować smug, kurze z białej szafki na papier toaletowy zostaną wytartęm, umywalka zostanie umyta.";
      case "Wyniesienie śmieci":
        return "Wyniesienie śmieci uważa się za zaliczone wyłącznie gdy: po wyniesieniu śmieci nowy worek zostanie założony na kubeł do śmieci";
      case "Odkurzanie w dużym pokoju":
        return "Odkurzanie uważa się za zaliczone jeżeli po kontroli cały pokój jest dokładnie odkurzony a na podłodzę nie ma okruchów ani kłębów kurzu";
      case "Odkurzanie w przedpokoju":
        return "Odkurzanie uważa się za zaliczone jeżeli po kontroli cały korytarz jest dokładnie odkurzony a na podłodzę nie ma okruchów ani kłębów kurzu";
      case "Umycie podłóg":
        return "Mycie podłóg uważa się za zaliczone jeżeli po kontroli, w całym domu umyte są podłogi";
      case "Posprzątanie dużej łazienki":
        return "Sprzątanie dużej łazienki uważa się za zaliczone gdy: Toaleta jest umyta (Myszla na zewnątrz i wewnątrz, deski klozetowe, plasitkowa osłona dookoła spłuczki) Lustro jest umytę oraz wytartę ręcznikami papierowymi. Umywalka i kran są dokładnie umyte. Wanna i bateria razem z słuchawką są dokłądnie umyte. Kurz oraz brud jest starty z pralki. Kurz z półek na których leżą ręczniki jest starty. ";
      case "Posprzątanie pokoju":
        return "Sprzatanie pokoju uznaje się za zaliczone gdy: Podłoga w pokoju jest odkurzona i umyta a na ziemi nie leżą żadne okruchy, śmieci lub kurz. Biurka są dokładnie umytę, Posciel w łóżkach zmieniona a stara wrzucona do prania. rzeczy na półkach są poukładane a kurz z półek jest starty, Kurz z Parapetów jest starty. ";
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-slate-950 rounded-lg shadow-xl md:max-w-md mx-auto p-6 space-y-4">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 w-10 h-10 rounded bg-slate-800 hover:bg-slate-600 hover:scale-110 text-white transition ease-in-out duration-150"
        >
          X
        </button>
        <h2 className="text-2xl font-semibold text-gray-200">{taskTitle}</h2>
        <p className="text-gray-100">{taskInfo()}</p>
        {/* Add buttons or other interactive elements here if needed */}
      </div>
    </div>
  );
}

export default InfoModal;

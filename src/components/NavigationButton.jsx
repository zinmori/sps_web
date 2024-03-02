import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function NavigationButton({
  data,
  onNextPage,
  onPreviousPage,
  currentPage,
  endIndex,
}) {
  const buttonStyle =
    "font-semibold py-2 p-4 m-4 w-40 items-center justify-center flex flex-col rounded-full";

  let prevStyle = buttonStyle;
  if (currentPage === 0) {
    prevStyle += " text-slate-600 cursor-not-allowed";
  } else {
    prevStyle += " hover:text-red-600";
  }
  let nextStyle = buttonStyle;
  if (endIndex === data.length) {
    nextStyle += " text-slate-600 cursor-not-allowed";
  } else {
    nextStyle += " hover:text-red-600";
  }

  return (
    <div className="flex flex-row items-center">
      <button onClick={onPreviousPage} className={prevStyle}>
        <IoIosArrowBack size={40} />
        <p>Précedent</p>
      </button>
      <p>{currentPage + 1}</p>
      <button onClick={onNextPage} className={nextStyle}>
        <IoIosArrowForward size={40} />
        <p>Suivant</p>
      </button>
    </div>
  );
}

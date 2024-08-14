import { authYandex } from "@/actions/mutation/login";
import { FaYandex } from "react-icons/fa6";

export function YandexButton() {
  return (
    <form action={authYandex}>
      <button
        type="submit"
        className="btn flex w-full items-center justify-center bg-red-600 text-white hover:bg-red-700"
      >
        <FaYandex />
        Войти с Yandex ID
      </button>
    </form>
  );
}

export function Social() {
  return (
    <div className="flex w-full flex-col gap-2">
      <YandexButton />
    </div>
  );
}

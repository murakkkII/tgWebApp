import asyncio
import datetime
from typing import Dict, Optional

from aiogram import Bot, Dispatcher
from aiogram.filters import Command
from aiogram.types import (
    Message,
    InlineKeyboardMarkup,
    InlineKeyboardButton,
    CallbackQuery,
)

TOKEN = "8216968844:AAEs4qhnOks7DLrRvle9t9Qo8xAYakU5jLY"

bot = Bot(token=TOKEN)
dp = Dispatcher()

user_states: Dict[int, Optional[str]] = {}

def main_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="⏰ Поставить напоминание",
                    callback_data="set_reminder",
                )
            ]
        ]
    )


@dp.message(Command("start"))
async def cmd_start(message: Message) -> None:
    user = message.from_user

    if user is None:
        username = "друг"
    else:
        username = user.username or user.first_name

    await message.answer(
        f"Привет, {username}! 👋\n\n"
        "Я бот с напоминаниями.\n"
        "Выбери действие 👇",
        reply_markup=main_keyboard(),
    )

@dp.callback_query(lambda c: c.data == "set_reminder")
async def set_reminder(callback: CallbackQuery) -> None:
    user_states[callback.from_user.id] = "waiting_reminder"

    await callback.message.answer(
        "✍️ Введи напоминание в формате:\n\n"
        "`HH:MM текст`\n\n"
        "Пример:\n"
        "`18:30 сделать домашку`",
        parse_mode="Markdown",
    )
    await callback.answer()

@dp.message()
async def handle_message(message: Message) -> None:
    user_id = message.from_user.id if message.from_user else None

    if user_id is None:
        return

    if user_states.get(user_id) != "waiting_reminder":
        return

    try:
        time_part, text = message.text.split(" ", 1)
        hour, minute = map(int, time_part.split(":"))

        now = datetime.datetime.now()
        reminder_time = now.replace(hour=hour, minute=minute, second=0)

        if reminder_time <= now:
            reminder_time += datetime.timedelta(days=1)

        delay = (reminder_time - now).total_seconds()

        asyncio.create_task(
            send_reminder_after_delay(delay, message.chat.id, text)
        )

        await message.answer("✅ Напоминание установлено!")
        user_states[user_id] = None

    except Exception:
        await message.answer(
            "❌ Ошибка формата.\n\n"
            "Используй:\n"
            "`HH:MM текст`",
            parse_mode="Markdown",
        )

async def send_reminder_after_delay(
    delay: float, chat_id: int, text: str
) -> None:
    await asyncio.sleep(delay)
    await bot.send_message(chat_id, f"⏰ Напоминание:\n{text}")

async def main() -> None:
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())

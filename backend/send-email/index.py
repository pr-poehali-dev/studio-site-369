import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта на почту zuravkovplaton@gmail.com"""

    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
        name = body.get("name", "").strip()
        contact = body.get("contact", "").strip()
        message = body.get("message", "").strip()

        if not name or not contact or not message:
            return {
                "statusCode": 400,
                "headers": cors,
                "body": json.dumps({"error": "Заполните все поля"}),
            }

        gmail_user = "zuravkovplaton@gmail.com"
        gmail_password = os.environ["GMAIL_APP_PASSWORD"]

        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"🎮 Новая заявка с сайта GameCode от {name}"
        msg["From"] = gmail_user
        msg["To"] = gmail_user

        html = f"""
        <div style="font-family: 'Courier New', monospace; background: #050805; color: #00ff41; padding: 32px; border-radius: 8px; max-width: 560px;">
            <div style="border: 1px solid rgba(0,255,65,0.3); padding: 24px; margin-bottom: 16px;">
                <p style="color: rgba(0,255,65,0.5); font-size: 11px; letter-spacing: 3px; margin: 0 0 16px;">// НОВАЯ_ЗАЯВКА :: GAMECODE_STUDIO</p>
                <table style="width:100%; border-collapse: collapse;">
                    <tr>
                        <td style="color: rgba(0,255,65,0.5); padding: 6px 0; font-size: 12px; width: 130px;">ИМЯ</td>
                        <td style="color: #00ff41; padding: 6px 0; font-size: 14px; font-weight: bold;">{name}</td>
                    </tr>
                    <tr>
                        <td style="color: rgba(0,255,65,0.5); padding: 6px 0; font-size: 12px;">КОНТАКТ</td>
                        <td style="color: #00e5ff; padding: 6px 0; font-size: 14px;">{contact}</td>
                    </tr>
                </table>
            </div>
            <div style="border: 1px solid rgba(0,255,65,0.2); padding: 20px;">
                <p style="color: rgba(0,255,65,0.5); font-size: 11px; letter-spacing: 3px; margin: 0 0 12px;">// СООБЩЕНИЕ</p>
                <p style="color: #00ff41; font-size: 14px; line-height: 1.7; margin: 0;">{message}</p>
            </div>
            <p style="color: rgba(0,255,65,0.2); font-size: 10px; margin-top: 20px; text-align: center;">
                © GAMECODE_STUDIO :: AUTO_NOTIFICATION
            </p>
        </div>
        """

        msg.attach(MIMEText(html, "html"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(gmail_user, gmail_password)
            server.sendmail(gmail_user, gmail_user, msg.as_string())

        return {
            "statusCode": 200,
            "headers": cors,
            "body": json.dumps({"ok": True, "message": "Заявка отправлена!"}),
        }

    except KeyError:
        return {
            "statusCode": 500,
            "headers": cors,
            "body": json.dumps({"error": "Секрет GMAIL_APP_PASSWORD не настроен"}),
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": cors,
            "body": json.dumps({"error": str(e)}),
        }

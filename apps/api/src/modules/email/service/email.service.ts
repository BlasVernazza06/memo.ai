import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BrevoClient } from '@getbrevo/brevo';

@Injectable()
export class EmailService {
  private client: BrevoClient;
  private senderEmail: string;
  private senderName: string;

  constructor(private configService: ConfigService) {
    this.client = new BrevoClient({
      apiKey: this.configService.getOrThrow('BREVO_SECRET_KEY'),
    });
    this.senderEmail = this.configService.getOrThrow('BREVO_SENDER_EMAIL');
    this.senderName = this.configService.getOrThrow('BREVO_SENDER_NAME');
  }

  async sendResetPasswordEmail(email: string, url: string) {
    try {
      await this.client.transactionalEmails.sendTransacEmail({
        subject: 'Recuperar tu contraseña de Memo.ai',
        sender: { name: this.senderName, email: this.senderEmail },
        to: [{ email: email }],
        htmlContent: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <div style="padding: 20px; background-color: #f8f9fa; border-radius: 12px; border: 1px solid #eee;">
              <h1 style="color: #000; margin-top: 0;">Recuperación de contraseña</h1>
              <p>Hola,</p>
              <p>Has solicitado restablecer tu contraseña en <strong>Memo.ai</strong>. Haz clic en el botón de abajo para continuar:</p>
              <div style="margin: 30px 0;">
                <a href="${url}" style="display: inline-block; background-color: #000; color: #fff; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  Restablecer contraseña
                </a>
              </div>
              <p style="color: #666; font-size: 14px;">Si no solicitaste este cambio, puedes ignorar este correo de forma segura.</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="color: #999; font-size: 12px; text-align: center;">${this.senderName} - Tu plan de estudio inteligente</p>
            </div>
          </div>
        `,
      });
    } catch (error) {
      console.error('Error al enviar el email con Brevo:', error);
      throw error;
    }
  }

  async sendVerificationEmail(email: string, url: string) {
    try {
      await this.client.transactionalEmails.sendTransacEmail({
        subject: 'Verifica tu cuenta de Memo.ai',
        sender: { name: this.senderName, email: this.senderEmail },
        to: [{ email: email }],
        htmlContent: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <div style="padding: 20px; background-color: #f8f9fa; border-radius: 12px; border: 1px solid #eee;">
              <h1 style="color: #000; margin-top: 0;">Verificación de cuenta</h1>
              <p>Hola,</p>
              <p>¡Gracias por unirte a <strong>Memo.ai</strong>! Por favor, verifica tu dirección de correo electrónico haciendo clic en el botón de abajo:</p>
              <div style="margin: 30px 0;">
                <a href="${url}" style="display: inline-block; background-color: #000; color: #fff; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  Verificar mi cuenta
                </a>
              </div>
              <p style="color: #666; font-size: 14px;">Si no creaste una cuenta, puedes ignorar este correo.</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p style="color: #999; font-size: 12px; text-align: center;">${this.senderName} - Tu plan de estudio inteligente</p>
            </div>
          </div>
        `,
      });
    } catch (error) {
      console.error(
        'Error al enviar el email de verificación con Brevo:',
        error,
      );
      throw error;
    }
  }
}

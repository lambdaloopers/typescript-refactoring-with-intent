export interface EmailService {
  sendEmail(address: string, title: string, content: string): void;
}
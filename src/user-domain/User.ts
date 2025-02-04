export class User {
  constructor(
    public id: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public can_send_marketing_email: boolean,
    public username: string,
    public password: string,
    public address_1: string,
    public zip_code: string,
    public city: string,
    public country: string,
    public last_login_at: Date,
    public cookie_consent_accepted: boolean,
    public card_holder_name: string,
    public card_number: string,
    public card_expiry_year: number,
    public card_expiry_month: number,
    public card_cvv: string,
    public blocked_at?: Date,
    public birth_date?: Date,
    public address_2?: string,
    public profile_pic_url?: string,
  ) {
  }

  public get full_name(): string {
    return this.first_name + " " + this.last_name;
  }

  public get full_address(): string {
    return this.address_1 + " " + this.address_2 + " (" + this.zip_code + ")" + this.city + ", " + this.country;
  }

  public get is_blocked(): boolean {
    return this.blocked_at != null;
  }

  public get card_is_expired(): boolean {
    const now: Date = new Date();

    const card_date: Date = new Date(Date.parse(this.card_expiry_year + "-" + (this.card_expiry_month + 1) + "-01"));

    if (now > card_date) {
      return true;
    } else {
      return false;
    }
  }

  public get is_over_18(): boolean {
    if (!this.birth_date) {
      return false;
    }

    const years: number = new Date().getFullYear() - this.birth_date.getFullYear();

    if (years >= 18) {
      return true;
    } else {
      return false;
    }
  }
}
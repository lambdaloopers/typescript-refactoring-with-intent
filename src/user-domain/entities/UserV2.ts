import {WithPayment} from "./User";

export class Address {
  constructor(
    public address_1: string,
    public zip_code: string,
    public city: string,
    public country: string,
    public address_2?: string,
  ) {
  }

  public get full_address(): string {
    return this.address_1 + " " +
      this.address_2 + " (" + this.zip_code + ")" +
      this.city + ", " + this.country;
  }
}

export class PaymentDetails implements WithPayment {
  constructor(
    public card_holder_name: string,
    public card_number: string,
    public card_expiry_year: number,
    public card_expiry_month: number,
    public card_cvv: string,
  ) {
  }

  public card_is_expired(): boolean {
    const now: Date = new Date();

    const card_date: Date = new Date(Date.parse(
      this.card_expiry_year + "-" + (this.card_expiry_month + 1) + "-01"));

    return now > card_date;
  }
}

export class MailingDetails {
  constructor(
    public email: string,
    public can_send_marketing_email: boolean,
    public cookie_consent_accepted: boolean,
  ) {
  }
}

export class AuthorizableUser {
  constructor(
    public username: string,
    public password: string,
    public last_login_at: Date,
    public blocked_at?: Date,
  ) {
  }

  public get is_blocked(): boolean {
    return this.blocked_at != null;
  }
}

export class Profile {
  constructor(
    public first_name: string,
    public last_name: string,
    public birth_date?: Date,
    public profile_pic_url?: string,
  ) {
  }

  public get full_name(): string {
    return this.first_name + " " + this.last_name;
  }

  public get is_over_18(): boolean {
    if (!this.birth_date) {
      return false;
    }

    const years: number = new Date().getFullYear() - this.birth_date.getFullYear();

    return years >= 18;
  }
}

export class UserV2 {
  constructor(
    public id: string,
    public profile: Profile,
    public address: Address,
    public mailingDetails: MailingDetails,
    public paymentDetails: PaymentDetails,
    public authorizableUser: AuthorizableUser,
  ) {
  }

  public get full_name(): string {
    return this.profile.full_name;
  }

  public get full_address(): string {
    return this.address.full_address;
  }

  public get is_blocked(): boolean {
    return this.authorizableUser.is_blocked;
  }

  public get card_is_expired(): boolean {
    return this.paymentDetails.card_is_expired();
  }

  public get is_over_18(): boolean {
    return this.profile.is_over_18;
  }
}
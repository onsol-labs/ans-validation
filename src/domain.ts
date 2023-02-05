export class Domain {
  public readonly hostname: string;
  public readonly labels: string[];
  public readonly isTldAscii: boolean;
  public readonly isTld: boolean;
  constructor(hostname: string) {
    this.hostname = hostname;
    // tslint:disable-next-line:deprecation
    this.labels = this.hostname.split('.');
    this.isTldAscii = !this.hostname
      .substring(this.hostname.lastIndexOf('.'))
      .startsWith('.xn--');
    this.isTld =
      this.hostname.substring(this.hostname.lastIndexOf('.')) ===
      `.${this.hostname.lastIndexOf('.')}`;
  }
}

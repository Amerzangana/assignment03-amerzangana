import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CreateClientsPage {

  readonly page: Page;
  readonly clientViewButton: Locator;
  readonly createClientButton: Locator; 
  readonly clientNameTextfield: Locator;
  readonly clientEmailTextfield: Locator;
  readonly clientPhoneTextfield: Locator;
  readonly clientSaveButton: Locator;
  readonly clientBackButton: Locator;
  readonly lastelement: Locator;

  constructor(page: Page) {

    this.page = page;
    this.clientViewButton = page.locator('#app > div > div > div:nth-child(2) > a');
    this.createClientButton = page.getByRole('link', { name: 'Create Client' }) 
    this.clientNameTextfield = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox')
    this.clientEmailTextfield = page.locator('input[type="email"]');
    this.clientPhoneTextfield = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
    this.clientSaveButton = page.getByText('Save');    
    this.clientBackButton = page.getByRole('link', { name: 'Back' });  
    this.lastelement = page.locator('#app > div > div.clients > div:nth-last-child(1)');  
}

  async CreateClients(fullName: string, email:string, phoneNo:string) {
    await this.createClientButton.click();
    await this.clientNameTextfield.fill(fullName);
    await this.clientEmailTextfield.fill(email);
    await this.clientPhoneTextfield.fill(phoneNo);
    await this.clientSaveButton.click();    
  }
}
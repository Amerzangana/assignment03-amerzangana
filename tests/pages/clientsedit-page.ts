import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class ClientsEdit {

readonly page: Page;
readonly client2AltButton: Locator;
readonly client1AltButton: Locator;
readonly clientEditButton: Locator;
readonly clientDeleteButton: Locator;
readonly clientNameTextfield: Locator;
readonly clientEmailTextfield: Locator;
readonly clientPhoneTextfield: Locator;
readonly clientSaveButton: Locator;
readonly clientBackButton: Locator;
readonly lastelement: Locator;
readonly firstelement: Locator;

constructor(page: Page) {
    
    this.page = page;
    this.client2AltButton = page.locator('div:nth-child(2) > .action');
    this.client1AltButton = page.locator('div:nth-child(1) > .action');
    this.clientEditButton = page.locator('#app > div > div.clients > div:nth-child(2) > div.menu > a:nth-child(1)');
    this.clientDeleteButton = page.getByText('Delete');
    this.clientNameTextfield = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
    this.clientEmailTextfield = page.locator('input[type="email"]');
    this.clientPhoneTextfield = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
    this.clientSaveButton = page.getByText('Save');    
    this.clientBackButton = page.getByRole('link', { name: 'Back' });
    this.lastelement = page.locator('#app > div > div.clients > div:nth-child(2)');  
    this.firstelement = page.locator('#app > div > div.clients > div:nth-child(1)');  
}

async EditClients() {
    await this.client2AltButton.click();
    await this.clientEditButton.click();
    await this.clientNameTextfield.fill("Aimer Gang");
    await this.clientEmailTextfield.fill("Gangster@Ganggangcrew.se");
    await this.clientPhoneTextfield.fill("003")
    await this.clientSaveButton.click();   
    await this.page.waitForTimeout(500);
}

async DeliteClients() {
    await this.client1AltButton.click();
    await this.clientDeleteButton.click();
    await this.page.waitForTimeout(1000);
}

async veryifryEditclient() {
    await expect(this.lastelement).toContainText("Aimer Gang");
    await expect(this.lastelement).toContainText("Gangster@Ganggangcrew.se");
    await expect(this.lastelement).toContainText("003");
  }

  async verifyDeleteClient() {
    await expect(this.firstelement).not.toContainText("Jonas Hellman");
  }
}

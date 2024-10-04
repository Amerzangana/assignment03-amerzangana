import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class ClientsView {

readonly page: Page;
readonly clientViewButton: Locator;
readonly lastelement: Locator;

constructor(page: Page) {

    this.page = page;
    this.clientViewButton = page.locator('#app > div > div > div:nth-child(2) > a');
    this.lastelement = page.locator('#app > div > div.clients > div:nth-last-child(1)');
}

async ClientsView() {
await this.clientViewButton.click();
}

async verifyfirstelement() {
    await expect(this.page.getByText('Clients')).toBeVisible();
}

async verifylastelement(fullName: string, userEmail:string, userPhoneNo:string){
    await expect(this.lastelement).toContainText(fullName);
    await expect(this.lastelement).toContainText(userEmail);
    await expect(this.lastelement).toContainText(userPhoneNo);
}
}

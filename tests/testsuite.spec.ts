import { test, expect } from '@playwright/test';
import { faker } from "@faker-js/faker";
import { APIHelper } from './apiHelpers';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { ClientsView } from './pages/clientsview-page';
import { ClientsEdit } from './pages/clientsedit-page';
import { CreateClientsPage } from './pages/createclients-page';
import * as dotenv from 'dotenv';

// Hämta bas URL för API
const BASE_URL_API = `${process.env.BASE_URL_API}`;

test.describe('Backend Test Suite Hotel', () => {
    let apiHelper: APIHelper;

    test.beforeAll(async ({ request }) => {
        apiHelper = new APIHelper(BASE_URL_API);
        const login = await apiHelper.login(request);
        expect(login.ok()).toBeTruthy();
        expect(login.status()).toBe(200);
    });

    test('Get all Rooms', async ({ request }) => {
        const getAllRooms = await apiHelper.getAllRooms(request);
        expect(getAllRooms.ok()).toBeTruthy();
        expect(getAllRooms.status()).toBe(200);
    });

    test('Get Room By ID', async ({ request }) => {
        const getRoomByID = await apiHelper.getRoomByID(request);
        expect(getRoomByID.ok()).toBeTruthy();
        expect(getRoomByID.status()).toBe(200);
    });
});

// Frontend tester
test.describe('Frontend Test Suite Hotel', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`);
        await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
        await page.waitForTimeout(5000);
    });

    test.afterEach(async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.performLogout();
        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    });

    test('Create Client With Faker', async ({ page }) => {
        const clientsView = new ClientsView(page);
        const createClientsPage = new CreateClientsPage(page);

        await clientsView.ClientsView();
        const fullName = faker.person.fullName();
        const userEmail = faker.internet.email();
        const userPhoneNo = faker.phone.number();

        await createClientsPage.CreateClients(fullName, userEmail, userPhoneNo);
        await clientsView.verifylastelement(fullName, userEmail, userPhoneNo);
    });

    test('Login', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    });
});

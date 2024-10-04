import { APIRequestContext } from "@playwright/test";

export class APIHelper {
    private baseUrl: string;
    private username: string;
    private token: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async login(request: APIRequestContext) {
        const response = await request.post(`${this.baseUrl}/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                username: `${process.env.TEST_USERNAME}`,
                password: `${process.env.TEST_PASSWORD}`
            })
        });

        // Logga responsstatus och text
        console.log(`Response status: ${response.status()}`);
        console.log(`Response body: ${await response.text()}`);

        const responsData = await response.json();
        this.username = responsData.username;
        this.token = responsData.token;
        return response;
    }

    async getAllRooms(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/rooms`, {
            headers: {
                'Content-Type': 'application/json',
                'x-user-auth': JSON.stringify({
                    username: this.username,
                    token: this.token
                })
            }
        });
        return response;
    }
    
    async getRoomByID(request: APIRequestContext) {
        const response = await request.get(`${this.baseUrl}/room/1`, {
            headers: {
                'Content-Type': 'application/json',
                'x-user-auth': JSON.stringify({
                    username: this.username,
                    token: this.token
                })
            }
        });
        return response;
    }
}

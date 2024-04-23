export class DataManager {

    private UUID : string;

    constructor(){

        this.UUID = ""
    }
    routingTable (data : string) {
        const json = JSON.parse(data);
        switch(json.action){
            case "set-UUID":
                this.UUID = json.UUID;
        }
    }

    async getUUID(): Promise<string> {
        // Check if UUID is already set
        if (this.UUID !== "") {
            return Promise.resolve(this.UUID);
        }

        // If not, wait for it to be set or reject after 5 seconds
        return new Promise<string>((resolve, reject) => {
            const timeout = setTimeout(() => {
                clearTimeout(timeout);
                reject(new Error('Timeout: UUID not set'));
            }, 5000);

            const interval = setInterval(() => {
                if (this.UUID !== "") {
                    clearTimeout(timeout);
                    clearInterval(interval);
                    resolve(this.UUID);
                }
            }, 100);
        });
    }
}
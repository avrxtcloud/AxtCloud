const { EC2Client, DescribeImagesCommand } = require("@aws-sdk/client-ec2");

// Mock environment for the script if running locally without .env loader
const region = process.env.AXT_AWS_REGION || "ap-south-1";
const accessKeyId = process.env.AXT_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AXT_AWS_SECRET_ACCESS_KEY;

if (!accessKeyId || !secretAccessKey) {
    console.error("Please set AXT_AWS_ACCESS_KEY_ID and AXT_AWS_SECRET_ACCESS_KEY env vars.");
    process.exit(1);
}

const client = new EC2Client({
    region,
    credentials: { accessKeyId, secretAccessKey }
});

async function getLatestAMI(namePattern) {
    const command = new DescribeImagesCommand({
        Filters: [
            { Name: "name", Values: [namePattern] },
            { Name: "state", Values: ["available"] }
        ],
        Owners: ["amazon"]
    });

    try {
        const response = await client.send(command);
        const images = response.Images.sort((a, b) => new Date(b.CreationDate) - new Date(a.CreationDate));
        if (images.length > 0) {
            return images[0];
        }
        return null;
    } catch (err) {
        console.error("Error fetching AMI:", err);
        return null;
    }
}

async function main() {
    console.log("Fetching latest Windows AMIs for", region, "...");

    const win2022 = await getLatestAMI("Windows_Server-2022-English-Full-Base-*");
    const win2019 = await getLatestAMI("Windows_Server-2019-English-Full-Base-*");
    const ubuntu22 = await getLatestAMI("ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*");
    const ubuntu24 = await getLatestAMI("ubuntu/images/hvm-ssd/ubuntu-noble-24.04-amd64-server-*");
    const debian12 = await getLatestAMI("debian-12-amd64-*");

    console.log("Win 2022:", win2022 ? win2022.ImageId : "Not Found");
    console.log("Win 2019:", win2019 ? win2019.ImageId : "Not Found");
    console.log("Ubuntu 22:", ubuntu22 ? ubuntu22.ImageId : "Not Found");
    console.log("Ubuntu 24:", ubuntu24 ? ubuntu24.ImageId : "Not Found");
    console.log("Debian 12:", debian12 ? debian12.ImageId : "Not Found");
}

main();

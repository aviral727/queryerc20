import * as ethers from "ethers";
import * as express from "express";

const app = express();

// const MNEMONIC = process.env.MNEMONIC;
const CONTRACT_ADDRESS = "0xEd18d7c090Ea37d5A5FeD1d518eA2b4FE3718ec7";

const ABI = [
  "function queryStakedTokens(uint _id) external view returns (uint)",
  "function queryRewards(uint _id) external view returns (uint)",
  "function returnPositions() public returns (Position[])",
];

app.get("/get", async (req, res) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

  try {
    const value = await contract.value();
    res.send(value);
  } catch (e) {
    res.send(e);
  }
});

app.get("/set/:value", async (req, res) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
  try {
    await contract.setValue(req.params.value);
    res.send("OK");
  } catch (e) {
    res.send(e);
  }
});

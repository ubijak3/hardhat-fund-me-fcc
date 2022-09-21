// function deployFunc() {
//   console.log("Hi!")
// }

// module.exports.default = deployFunc

// module.exports = async (hre) => {
//     const {getNamedAccounts, deployments} = hre

// }

const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId

  //   const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
  let ethUsdPriceFeedAddress
  if (chainId == 31337) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator")
    ethUsdPriceFeedAddress = ethUsdAggregator.address
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
  }

  //if the priceFeed contract doesnt exist, we deploy a minimal version of it for our local testing

  const args = [ethUsdPriceFeedAddress]
  const FundMe = await deploy("FundMe", {
    from: deployer,
    args: args, // priceFeedAddres,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })

  log("-------------------------------------------------------")
}

module.exports.tags = ["all", "fundme"]

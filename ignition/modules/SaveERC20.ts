import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const tokenAddress = "0x488Cdc396B5EdeC1c6da0Da00d1Ab2f5c9a63C03";

const SaveERC20Module = buildModule("SaveERC20Module", (m) => {

    const save = m.contract("SaveERC20", [tokenAddress]);

    return { save };
});

export default SaveERC20Module;

// SaveERC20Module#SaveERC20 - 0x9Cf7d707d46f5a828FBb80ff2E8cED43023dFcdC
// Web3CXIModule#Web3CXI - 0x488Cdc396B5EdeC1c6da0Da00d1Ab2f5c9a63C03
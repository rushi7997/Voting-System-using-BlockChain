pragma solidity ^0.4.25;

import "./ERC20.sol";
import "./ERC20Detailed.sol";

contract root is ERC20,ERC20Detailed {

    address public admin;

    address public winnerAddress;
    uint public winnerVotes;

    struct voterSchema{
        string name;
        address voterAddress;
        bool voted; // Extra Security
    }

    struct candidateSchema{
        string name;
        address candidateAddress;
    }

    mapping(address =>voterSchema) voter;
    mapping(address =>candidateSchema) candidate;

    mapping(address => bool) whitelistedVoter;
    mapping(address => bool) whitelistedCandidate;

    address[] public voters;
    address[] public candidates;

    constructor(string _name,string _symbol,uint8 _decimals) ERC20Detailed(_name,_symbol,_decimals){ 
        admin = msg.sender;
    }

    function getCandidatesCount() public view returns(uint) {
        return candidates.length;
    }

    function getVotersCount() public view returns(uint) {
        return voters.length;
    }

    function getCandidate(address add) public view returns (string,address) {
        candidateSchema storage tempCandidate = candidate[add];
        return (
            tempCandidate.name,
            tempCandidate.candidateAddress
        );
    }

    function getVoter(address add) public view returns (string,address,bool) {
        voterSchema storage tempVoter = voter[add];
        return (
            tempVoter.name,
            tempVoter.voterAddress,
            tempVoter.voted
        );
    }

    function candidateRegister(string memory name,address candidateAddress) public returns(bool){
        require(msg.sender == admin,"Access Denied.");

        candidateSchema memory wantToRegisterAsCandidate = candidateSchema(name,candidateAddress);
        candidates.push(candidateAddress);
        candidate[candidateAddress] = wantToRegisterAsCandidate;
        whitelistedCandidate[candidateAddress] = true;

        return true;
    }

    function voterRegister(string memory name,address voterAddress) public returns(bool){
        require(msg.sender == admin,"Access Denied.");

        voterSchema memory wantToRegisterAsVoter = voterSchema(name,voterAddress,false);
        voters.push(voterAddress);
        voter[voterAddress] = wantToRegisterAsVoter;
        whitelistedVoter[voterAddress] = true;
        _mint(voterAddress, 1);

        return true;
    }

    function vote(address candidateAddress) public returns(bool){
        require(msg.sender != address(0),"Invalid User");
        require(whitelistedVoter[msg.sender],"Access Denied For Voting.");
        require(balanceOf(msg.sender) > 0, "Your Voting Has Done.");

        voterSchema storage currentVoter = voter[msg.sender];
        require(!currentVoter.voted,"Your Voting Has Done Already.");
        transfer(candidateAddress,1);
        currentVoter.voted = true;

        return true;
    }

    function winner() public returns(address,uint){
        require(msg.sender == admin,"Access Denied.");

        uint maxVote = 0;
        address winner = address(0);
        for (uint i = 0; i < candidates.length; i++) {
            uint tempVoteCount = balanceOf(candidates[i]);
            if(maxVote < tempVoteCount){
                maxVote = tempVoteCount;
                winner = candidates[i];
            }
        }
        winnerAddress = winner;
        winnerVotes = maxVote;
        return(winner,maxVote);
    }
}
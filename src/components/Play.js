// import {ethers} from 'ethers';
import scissors from '../scissors.png';
import paper from '../paper.png';
import rock from '../rock.png';
import { useEffect, useState } from 'react';

const Play = ({state, account})=>{
    let {contract} = state;
    console.log("Account in PLay -",account);
    console.log(contract,".........");
    const [won, setWon] = useState(0);
    const [lost, setLost] = useState(0);
    const [draw, setDraw] = useState(0);

    let woncount,lostcount,drawcount;

    const ReadData=async()=>{
        if (contract && account.length > 0) {
            const [wonCount, lostCount, drawCount] = await Promise.all([
                contract.wonCount(account[0]),
                contract.lostCount(account[0]),
                contract.drawCount(account[0])
            ]);
            setWon(wonCount.toNumber());
            setLost(lostCount.toNumber());
            setDraw(drawCount.toNumber());
        }
    }
    useEffect(()=>{
        if(account){
            ReadData();
        }
    },[account,contract])

    const playGame = async(arg) => {
        if (contract && account.length > 0) {
        // event.preventDefault();
            const tx = await contract.play(arg,{gasLimit: 300000});
            await tx.wait();
            console.log(tx,"transaction");
            console.log("Tranaction is done!!");
            ReadData(); // Update the counts after playing the game
        }

    };

    function handleClick(arg) {
        playGame(arg);
    }

    return (
    <>
        <form onSubmit={handleClick}>
        <div style={{gap:"12px", display:"flex" , justifyContent:"center"}}>
        <img src={scissors} alt="Scissors" id="scissors" onClick={() => handleClick(0)} style={{ cursor: 'pointer',height:"200px", width:"200px" }}></img>
        <img src={paper} alt="Scissors" id="paper" onClick={() => handleClick(1)} style={{ cursor: 'pointer',height:"200px", width:"200px" }}></img>
        <img src={rock} alt="Scissors" id="rock" onClick={() => handleClick(2)} style={{ cursor: 'pointer',height:"200px", width:"200px" }}></img>
        </div>
        <br></br>
        <p>Won = {won} | Lost = {lost} | Draw = {draw}</p>
        </form>
    </>
    )
};
export default Play;
import styled from "styled-components";

const MealContent = (props) => {

    return <>
        <p>Name: {props.meal.name}</p>
        <p>Points: {props.meal.points}</p>
        <Img src={props.meal.secure_url} />
        <p>Description: {props.meal.description}</p>
        <p>Contains: {props.meal.contains}</p>
        <p>Days Available: {props.meal.daysAvailable}</p>
        <p>Servings: {props.meal.servings}</p>
        <p>Time Required: {props.meal.timeRequired} days</p>
    </>
}

export default MealContent;

const Img = styled.img`
    width: 500px;
    height: 500px;
    margin: 10px;
`

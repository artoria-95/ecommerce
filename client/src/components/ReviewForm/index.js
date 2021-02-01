import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { ReviewFormWrapper } from './styles';
import { addReview } from '../../redux/actions/review';
import ReactStars from "react-rating-stars-component";
import { Input } from 'reactstrap';
import { useHistory } from 'react-router';
import Button from '../Button';

const ReviewForm = ({ productId, last }) => {

  const [values, setValues] = useState({
    title: "",
    description: "",
    stars: 0
  });
  const [done, setDone] = useState(false);
  const history = useHistory();


  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productId);
    setDone(true);
    dispatch(addReview(values, productId));

    console.log(last);
    if (last)
      history.push("/");

  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setValues({
      ...values,
      stars: newRating
    });
  };

  return (
    <ReviewFormWrapper onSubmit={handleSubmit}>
      {
        !done &&
        <>

          <label>
            Titulo:
            <Input name="title" label="Title" value={values.title} onChange={handleChange} />
          </label>

          <label>
            Estrellas:
          <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
          </label>

          <label>
            Descripción:
            <Input name="description" value={values.description} onChange={handleChange} />
          </label>
          {/* <input type="submit" value="Send Review" /> */}
          <Button>Enviar Review</Button>
        </>
      }
    </ReviewFormWrapper>
  );
};

export default ReviewForm;

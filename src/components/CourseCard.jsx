import { Card, CardContent } from "./ui/Card.jsx";
import { Button } from "./ui/Button.jsx";
import { Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/CourseCard.css";
import courseDataImg from "../assets/course-data.jpg";


const CourseCard = ({ id, title, description, instructor, duration, rating = 4.5, image, category, price, level }) => {
  const navigate = useNavigate();
  const defaultImage = courseDataImg;


  return (
    <Card className="course-card">
      <div style={{position: 'relative', overflow: 'hidden', height: '200px'}}>
        <img
          src={image || defaultImage}
          alt={title}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            transition: 'transform 0.3s'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem'
        }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            backgroundColor: '#fbbf24',
            color: '#1a1a1a',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px'
          }}>
            {category}
          </span>
        </div>
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem'
        }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px'
          }}>
            {level}
          </span>
        </div>
      </div>
      
      <div>
        <h3>{title}</h3>
        <p>{instructor}</p>
      </div>

      <CardContent>
        <p>{description}</p>
        
        <div>
          <div>
            <Star style={{width: '1rem', height: '1rem', fill: '#fbbf24', color: '#fbbf24'}} />
            <span style={{fontWeight: '600'}}>{rating}</span>
          </div>
          <div style={{color: '#64748b'}}>
            <Clock style={{width: '1rem', height: '1rem'}} />
            <span>{duration}</span>
          </div>
        </div>
        
        <div style={{marginTop: '0.5rem'}}>
          <span style={{
            fontSize: '1.125rem',
            fontWeight: '700',
            color: '#2563eb'
          }}>
            Rs. {price}
          </span>
        </div>
      </CardContent>

      <div>
        <Button 
          variant="outline" 
          style={{width: '100%'}}
          onClick={() => navigate(`/courses/${id}`)}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default CourseCard;

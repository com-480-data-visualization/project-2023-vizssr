import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import { about } from '../../portfolio'
import './About.css'
import React from "react";

const About = () => {
  const { name, role, description, resume, social } = about

  return (
    <div className='about center'>

        <h1 className='about__title'>
            Global Living Costs Unveiled:
            <br/>
            A Comparative Analysis Across Time and Space
        </h1>

      <p className='about__desc'>{description}</p>

    </div>
  )
}

export default About

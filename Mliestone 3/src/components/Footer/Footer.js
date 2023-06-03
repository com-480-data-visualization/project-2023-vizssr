import './Footer.css'
import React from "react";

const Footer = () => (
    <footer
        style={{
        backgroundColor: '#f8f9fa',
        textAlign: 'center',
        padding: '20px',
        // position: 'fixed',
        left: '0',
        bottom: '0',
        width: '100%',
        borderTop: '1px solid #e7e7e7'
    }}>
        <p style={{
            margin: '0',
            fontSize: '18px',
            fontWeight: '600'
        }}>
            Numero Cost of Living Dataset Visualization with Nivo
        </p>
        <p style={{
            fontStyle: 'oblique',
            marginTop: '0.5rem',
            marginBottom: '0',
            color: '#6c757d'
        }}>
            Designed and Developed by VizSSR Team
        </p>
        <p style={{
            marginTop: '0.5rem',
            marginBottom: '0',
            color: '#6c757d'
        }}>
            © 2023 VizSSR Team. All rights reserved.
        </p>
    </footer>
)

export default Footer

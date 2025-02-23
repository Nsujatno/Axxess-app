import React, { useState } from 'react';

interface SurveyState {
  fever: boolean | null;
  urgentSymptoms: string[];
  severePain: boolean | null;
  infectionSymptoms: string[];
  recentFall: boolean | null;
  canBearWeight: boolean | null;
  chronicCondition: boolean | null;
  worseSymptomsToday: boolean | null;
  mentalHealthConcerns: string[];
  dailyAssistance: string[];
  medicationManagement: boolean | null;
  poorNutrition: boolean | null;
  loneliness: boolean | null;
}

const MedicalSurvey = () => {
  const [state, setState] = useState<SurveyState>({
    fever: null,
    urgentSymptoms: [],
    severePain: null,
    infectionSymptoms: [],
    recentFall: null,
    canBearWeight: null,
    chronicCondition: null,
    worseSymptomsToday: null,
    mentalHealthConcerns: [],
    dailyAssistance: [],
    medicationManagement: null,
    poorNutrition: null,
    loneliness: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: '"Century Gothic", sans-serif',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
  };

  const headerStyle = {
    padding: '20px',
    background: `linear-gradient(135deg, #d5002a 0%, #d3058b 100%)`,
    color: 'white',
    position: 'sticky' as const,
    top: 0,
    zIndex: 1,
  };

  const emergencyWarningStyle = {
    backgroundColor: '#d5002a',
    color: 'white',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(213, 0, 42, 0.2)',
  };

  const warningHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px',
    fontSize: '20px',
    fontWeight: 'bold',
  };

  const emergencyListStyle = {
    margin: '0',
    padding: '0 0 0 20px',
    listStyle: 'none',
  };

  const emergencyItemStyle = {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  };

  const formContainerStyle = {
    flex: 1,
    overflow: 'auto',
    padding: '20px',
    backgroundColor: '#f8f8f8',
  };

  const sectionStyle = {
    marginBottom: '30px',
    padding: '20px',
    border: '1px solid rgba(213, 0, 42, 0.1)',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  const questionStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#333',
  };

  const buttonStyle = {
    padding: '12px 24px',
    background: `linear-gradient(135deg, #d5002a 0%, #d3058b 100%)`,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
    transition: 'opacity 0.2s',
    ':hover': {
      opacity: 0.9,
    },
  };

  const footerStyle = {
    padding: '20px',
    background: 'white',
    borderTop: '1px solid rgba(213, 0, 42, 0.1)',
    position: 'sticky' as const,
    bottom: 0,
  };

  const checkboxContainerStyle = {
    marginLeft: '20px',
    marginBottom: '8px',
  };

  const radioContainerStyle = {
    display: 'flex',
    gap: '20px',
    marginLeft: '20px',
  };

  const needsUrgentCare = () => {
    return (
      state.fever ||
      state.urgentSymptoms.length > 0 ||
      state.severePain ||
      (state.infectionSymptoms.length > 0 && !state.infectionSymptoms.includes('None of the above')) ||
      (state.recentFall && !state.canBearWeight) ||
      (state.chronicCondition && state.worseSymptomsToday)
    );
  };

  const handleCheckboxChange = (array: string[], item: string, setter: (items: string[]) => void) => {
    const index = array.indexOf(item);
    if (index === -1) {
      setter([...array, item]);
    } else {
      setter(array.filter(i => i !== item));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Survey submitted:', state);
  };


  const alertStyle = {
    padding: '15px',
    backgroundColor: '#ff000020',
    border: '1px solid #ff0000',
    borderRadius: '4px',
    marginBottom: '20px',
    color: '#cc0000',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Medical Assessment Survey</h1>
      </div>

      <div style={{ ...formContainerStyle, padding: '20px' }}>
        {/* Emergency Warning Section */}
        <div style={emergencyWarningStyle}>
          <div style={warningHeaderStyle}>
            <span style={{ fontSize: '24px' }}>⚠️</span>
            <span>EMERGENCY WARNING - CALL 911 IMMEDIATELY IF:</span>
          </div>
          <ul style={emergencyListStyle}>
            <li style={emergencyItemStyle}>
              <span>•</span>
              <span>The patient is unconscious, unresponsive, or unable to wake up</span>
            </li>
            <li style={emergencyItemStyle}>
              <span>•</span>
              <span>The patient is experiencing severe breathing difficulties (gasping, blue lips, unable to speak)</span>
            </li>
            <li style={emergencyItemStyle}>
              <span>•</span>
              <span>The patient is having severe chest pain that lasts more than a few minutes or radiates to the arm, jaw, or back</span>
            </li>
          </ul>
          <div style={{ marginTop: '15px', fontWeight: 'bold', fontSize: '18px' }}>
            DO NOT COMPLETE THIS SURVEY - SEEK EMERGENCY CARE
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Step 2: Urgent Medical Concerns */}
          <div style={sectionStyle}>
            <h2 style={{ color: '#d5002a', marginBottom: '20px' }}>Urgent Medical Concerns</h2>
            
            {/* Fever */}
            <div style={questionStyle}>
              <label style={labelStyle}>
                Does the patient have a fever above 102°F (38.9°C)?
              </label>
              <div style={radioContainerStyle}>
                <label>
                  <input
                    type="radio"
                    name="fever"
                    value="true"
                    onChange={(e) => setState({ ...state, fever: e.target.value === 'true' })}
                  /> Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="fever"
                    value="false"
                    onChange={(e) => setState({ ...state, fever: e.target.value === 'true' })}
                  /> No
                </label>
              </div>
            </div>

            {/* Severe pain */}
            <div style={questionStyle}>
              <label style={labelStyle}>
                Is the patient experiencing severe pain anywhere in their body?
              </label>
              <div style={radioContainerStyle}>
                <label>
                  <input
                    type="radio"
                    name="severePain"
                    value="true"
                    onChange={(e) => setState({ ...state, severePain: e.target.value === 'true' })}
                  /> Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="severePain"
                    value="false"
                    onChange={(e) => setState({ ...state, severePain: e.target.value === 'true' })}
                  /> No
                </label>
              </div>
            </div>

            {/* Continue with all other questions using the same pattern... */}
            {/* Copy the structure from the previous version but apply the new styles */}
            
            {/* For checkbox groups, use this structure: */}
            <div style={questionStyle}>
              <label style={labelStyle}>
                Is the patient experiencing any of the following? Check all that apply
              </label>
              {['Confusion or disorientation', 'Persistent vomiting',
                'Severe dehydration (dizziness, dry mouth, no urination)', 'None of the above'].map(symptom => (
                <div key={symptom} style={checkboxContainerStyle}>
                  <label>
                    <input
                      type="checkbox"
                      checked={state.urgentSymptoms.includes(symptom)}
                      onChange={() => handleCheckboxChange(
                        state.urgentSymptoms,
                        symptom,
                        (items) => setState({ ...state, urgentSymptoms: items })
                      )}
                    /> {symptom}
                  </label>
                </div>
              ))}
            </div>

            {/* infectionSymptoms */}
            <div style={questionStyle}>
              <label style={labelStyle}>
                Does the patient have an infection-related symptom? Check all that apply
              </label>
              {['Swelling, redness, pus, warmth around a wound', 'Fever with shaking chills',
                'Increased pain in an existing wound', 'None of the above'].map(symptom => (
                <div key={symptom} style={checkboxContainerStyle}>
                  <label>
                    <input
                      type="checkbox"
                      checked={state.infectionSymptoms.includes(symptom)}
                      onChange={() => handleCheckboxChange(
                        state.infectionSymptoms,
                        symptom,
                        (items) => setState({ ...state, infectionSymptoms: items })
                      )}
                    /> {symptom}
                  </label>
                </div>
              ))}
            </div>
            
            {/* recentFall */}
            {/* recent falls or struggling to move */}
            <div style={questionStyle}>
              <label style={labelStyle}>
                Has the patient had a recent fall or is struggling to move?
              </label>
              <div style={radioContainerStyle}>
                <label>
                  <input
                    type="radio"
                    name="recentFall"
                    value="fall_urgent"
                    checked={state.recentFall === true && state.canBearWeight === false}
                    onChange={() => setState({ 
                      ...state, 
                      recentFall: true,
                      canBearWeight: false 
                    })}
                  /> Yes and they are not able to put weight on affected area (Urgent Doctor Visit Recommended)
                </label>
              </div>
              <div style={radioContainerStyle}>
                <label>
                  <input
                    type="radio"
                    name="recentFall"
                    value="fall_non_urgent"
                    checked={state.recentFall === true && state.canBearWeight === true}
                    onChange={() => setState({ 
                      ...state, 
                      recentFall: true,
                      canBearWeight: true 
                    })}
                  /> Yes but they are able to put weight on the affected area
                </label>
              </div>
              <div style={radioContainerStyle}>
                <label>
                  <input
                    type="radio"
                    name="recentFall"
                    value="no_fall"
                    checked={state.recentFall === false}
                    onChange={() => setState({ 
                      ...state, 
                      recentFall: false,
                      canBearWeight: null 
                    })}
                  /> No → Proceed to the next section
                </label>
              </div>
            </div>

            {/* Continue with all other sections... */}
          </div>

          {/* Step 3: Chronic Condition & Functional Assessment */}
          <div style={sectionStyle}>
            <h2 style={{ color: '#d5002a', marginBottom: '20px' }}>Chronic Condition & Functional Assessment</h2>
            
            {/* Chronic Condition */}
            <div style={questionStyle}>
              <label style={labelStyle}>
                Does the patient have a chronic condition (heart disease, COPD, diabetes, dementia, etc.)?
              </label>
              <div style={radioContainerStyle}>
                <label>
                  <input
                    type="radio"
                    name="chronicCondition"
                    value="true"
                    checked={state.chronicCondition === true}
                    onChange={(e) => setState({ 
                      ...state, 
                      chronicCondition: e.target.value === 'true',
                      worseSymptomsToday: null // Reset follow-up question when main answer changes
                    })}
                  /> Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="chronicCondition"
                    value="false"
                    checked={state.chronicCondition === false}
                    onChange={(e) => setState({ 
                      ...state, 
                      chronicCondition: e.target.value === 'true',
                      worseSymptomsToday: null // Reset follow-up question when main answer changes
                    })}
                  /> No → Proceed to the next section
                </label>
              </div>
            </div>

            {/* Conditional follow-up question for chronic condition */}
            {state.chronicCondition && (
              <div style={{ ...questionStyle, marginLeft: '20px' }}>
                <label style={labelStyle}>
                  Have their symptoms worsened today?
                </label>
                <div style={radioContainerStyle}>
                  <label>
                    <input
                      type="radio"
                      name="worseSymptomsToday"
                      value="true"
                      checked={state.worseSymptomsToday === true}
                      onChange={(e) => setState({ 
                        ...state, 
                        worseSymptomsToday: e.target.value === 'true' 
                      })}
                    /> Yes → Urgent doctor visit recommended
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="worseSymptomsToday"
                      value="false"
                      checked={state.worseSymptomsToday === false}
                      onChange={(e) => setState({ 
                        ...state, 
                        worseSymptomsToday: e.target.value === 'true' 
                      })}
                    /> No → Continue routine monitoring
                  </label>
                </div>
              </div>
            )}

            {/* Mental Health Concerns */}
            <div style={questionStyle}>
              <label style={labelStyle}>
                Has the patient shown any of the following cognitive or mental health concerns? (Check all that apply)
              </label>
              {[
                'Sudden confusion or memory loss',
                'Extreme drowsiness or difficulty staying awake',
                'Increased anxiety, depression, or social withdrawal',
                'None of the above'
              ].map(concern => (
                <div key={concern} style={checkboxContainerStyle}>
                  <label>
                    <input
                      type="checkbox"
                      checked={state.mentalHealthConcerns.includes(concern)}
                      onChange={() => handleCheckboxChange(
                        state.mentalHealthConcerns,
                        concern,
                        (items) => setState({ ...state, mentalHealthConcerns: items })
                      )}
                    /> {concern}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Step 4: Non-Emergency Home Care Needs */}
          <div style={sectionStyle}>
            <h2 style={{ color: '#d5002a', marginBottom: '20px' }}>Non-Emergency Home Care Needs</h2>
            
            {/* Daily Activities Assistance */}
            <div style={questionStyle}>
              <label style={labelStyle}>
                Does the patient require assistance with daily activities? (Check all that apply)
              </label>
              {[
                'Bathing',
                'Dressing',
                'Eating',
                'Using the restroom',
                'Moving around the house',
                'None of the above'
              ].map(activity => (
                <div key={activity} style={checkboxContainerStyle}>
                  <label>
                    <input
                      type="checkbox"
                      checked={state.dailyAssistance.includes(activity)}
                      onChange={() => handleCheckboxChange(
                        state.dailyAssistance,
                        activity,
                        (items) => setState({ ...state, dailyAssistance: items })
                      )}
                    /> {activity}
                  </label>
                </div>
              ))}
              {state.dailyAssistance.length > 0 && !state.dailyAssistance.includes('None of the above') && (
                <div style={alertStyle}>
                  Home care services should be scheduled or increased.
                </div>
              )}
            </div>

            {/* Medication Management */}
            <div style={questionStyle}>
              <label style={labelStyle}>
                Is the patient struggling with medication management? (Forgetting doses, taking incorrectly, missing refills)
              </label>
              <div style={radioContainerStyle}>
                <label>
                  <input
                    type="radio"
                    name="medicationManagement"
                    value="true"
                    checked={state.medicationManagement === true}
                    onChange={(e) => setState({ ...state, medicationManagement: e.target.value === 'true' })}
                  /> Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="medicationManagement"
                    value="false"
                    checked={state.medicationManagement === false}
                    onChange={(e) => setState({ ...state, medicationManagement: e.target.value === 'true' })}
                  /> No → Proceed to the next question
                </label>
              </div>
              {state.medicationManagement && (
                <div style={alertStyle}>
                  Home care provider should assist with medication tracking. If it is authorized family/hired caregiver, they must be changed.
                </div>
              )}
            </div>

            {/* Poor Nutrition */}
            <div style={questionStyle}>
              <label style={labelStyle}>
                Has the patient shown signs of poor nutrition or weight loss?
              </label>
              <div style={radioContainerStyle}>
                <label>
                  <input
                    type="radio"
                    name="poorNutrition"
                    value="true"
                    checked={state.poorNutrition === true}
                    onChange={(e) => setState({ ...state, poorNutrition: e.target.value === 'true' })}
                  /> Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="poorNutrition"
                    value="false"
                    checked={state.poorNutrition === false}
                    onChange={(e) => setState({ ...state, poorNutrition: e.target.value === 'true' })}
                  /> No → Proceed to the next question
                </label>
              </div>
              {state.poorNutrition && (
                <div style={alertStyle}>
                  Consider a dietary consultation or increased caregiver support. AI autosends schedule request to doctors that can come look in the next 2 days max.
                </div>
              )}
            </div>

            {/* Loneliness */}
            <div style={questionStyle}>
              <label style={labelStyle}>
                Does the patient show signs of loneliness or isolation?
              </label>
              <div style={radioContainerStyle}>
                <label>
                  <input
                    type="radio"
                    name="loneliness"
                    value="true"
                    checked={state.loneliness === true}
                    onChange={(e) => setState({ ...state, loneliness: e.target.value === 'true' })}
                  /> Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="loneliness"
                    value="false"
                    checked={state.loneliness === false}
                    onChange={(e) => setState({ ...state, loneliness: e.target.value === 'true' })}
                  /> No → Proceed to the next section
                </label>
              </div>
              {state.loneliness && (
                <div style={alertStyle}>
                  Encourage social engagement or mental health support.
                </div>
              )}
            </div>
          </div>
          
          
        </form>
      </div>

      <div style={footerStyle}>
        <button type="submit" style={buttonStyle}>
          Submit Assessment
        </button>

        {submitted && needsUrgentCare() && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: 'rgba(213, 0, 42, 0.1)',
            border: '1px solid #d5002a',
            borderRadius: '4px',
            color: '#d5002a',
            fontWeight: 'bold',
          }}>
            URGENT CARE NEEDED: Schedule immediate same-day appointment with high priority.
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalSurvey;
from dataclasses import dataclass
from typing import List, Optional
from datetime import datetime, timedelta

@dataclass
class PatientAssessment:
    fever_above_102: bool
    urgent_symptoms: List[str]
    severe_pain: bool
    infection_symptoms: List[str]
    has_immune_condition: bool
    recent_fall: bool
    can_bear_weight: Optional[bool]
    
    has_chronic_condition: bool
    worsened_symptoms: Optional[bool]
    mental_health_concerns: List[str]
    
    daily_assistance_needs: List[str]
    medication_management_issues: bool
    nutrition_concerns: bool
    social_isolation: bool

def calculate_severity_score(assessment: PatientAssessment) -> tuple[int, str, datetime]:
    """
    Calculate severity score (1-100) and recommended appointment timing.
    Returns: (severity_score, urgency_message, recommended_appointment_time)
    """
    score = 0
    current_time = datetime.now()
    
    if assessment.fever_above_102:
        score += 20
        
    urgent_symptom_scores = {
        "confusion": 15,
        "persistent_vomiting": 20,
        "severe_dehydration": 25
    }
    for symptom in assessment.urgent_symptoms:
        score += urgent_symptom_scores.get(symptom, 0)
        
    if assessment.severe_pain:
        score += 20
        
    infection_score = len(assessment.infection_symptoms) * 10
    if assessment.has_immune_condition and infection_score > 0:
        infection_score *= 1.5
    score += min(infection_score, 30)
    
    if assessment.recent_fall and not assessment.can_bear_weight:
        score += 20
        
    if assessment.has_chronic_condition and assessment.worsened_symptoms:
        score += 25
        
    mental_health_score = len(assessment.mental_health_concerns) * 10
    score += min(mental_health_score, 10)
    
    daily_assistance_score = len(assessment.daily_assistance_needs) * 3
    score += min(daily_assistance_score, 10)
    
    if assessment.medication_management_issues:
        score += 5
        
    if assessment.nutrition_concerns:
        score += 2
        
    if assessment.social_isolation:
        score += 2
        
    final_score = min(score, 100)
    
    if final_score >= 90:
        urgency = "IMMEDIATE ATTENTION REQUIRED"
        appt_time = current_time + timedelta(hours=1)
    elif final_score >= 75:
        urgency = "Very Urgent - Apppointment needed quickly"
        appt_time = current_time + timedelta(hours=2)
    elif final_score >= 60:
        urgency = "Urgent - Same Day Appointment Needed"
        appt_time = current_time + timedelta(hours=4)
    elif final_score >= 40:
        urgency = "Schedule appointment within 24 hours"
        appt_time = current_time + timedelta(days=1)
    elif final_score >= 30:
        urgency = "Schedule appointment within 2 days"
        appt_time = current_time + timedelta(days=2)
    else:
        urgency = "We recommend waiting until your routine checkup appointment"
        appt_time = current_time + timedelta(days=7)
        
    return final_score, urgency, appt_time


def process_frontend_data(frontend_data: dict) -> dict:
    """
    Process frontend checkbox data and return severity assessment
    """
    assessment = PatientAssessment(
        fever_above_102=frontend_data.get('fever_above_102', False),
        urgent_symptoms=frontend_data.get('urgent_symptoms', []),
        severe_pain=frontend_data.get('severe_pain', False),
        infection_symptoms=frontend_data.get('infection_symptoms', []),
        has_immune_condition=frontend_data.get('has_immune_condition', False),
        recent_fall=frontend_data.get('recent_fall', False),
        can_bear_weight=frontend_data.get('can_bear_weight'),
        has_chronic_condition=frontend_data.get('has_chronic_condition', False),
        worsened_symptoms=frontend_data.get('worsened_symptoms'),
        mental_health_concerns=frontend_data.get('mental_health_concerns', []),
        daily_assistance_needs=frontend_data.get('daily_assistance_needs', []),
        medication_management_issues=frontend_data.get('medication_management_issues', False),
        nutrition_concerns=frontend_data.get('nutrition_concerns', False),
        social_isolation=frontend_data.get('social_isolation', False)
    )
    
    score, urgency, appt_time = calculate_severity_score(assessment)
    
    print("score: " + str(score) + " urgency: " + urgency + " appt_time: " + appt_time.strftime('%Y-%m-%d %H:%M:%S'))

    return {
        'severity_score': score,
        'urgency_message': urgency,
        'recommended_appointment': appt_time.strftime('%Y-%m-%d %H:%M:%S'),
        'assessment_time': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }


def test_frontend_data_processing():
    test_frontend_data = {
        'fever_above_102': True,
        'urgent_symptoms': ['confusion', 'persistent_vomiting'],
        'severe_pain': False,
        'infection_symptoms': [],
        'has_immune_condition': False,
        'recent_fall': False,
        'can_bear_weight': False,
        'has_chronic_condition': False,
        'worsened_symptoms': False,
        'mental_health_concerns': [],
        'daily_assistance_needs': [],
        'medication_management_issues': False,
        'nutrition_concerns': False,
        'social_isolation': False
    }

    result = process_frontend_data(test_frontend_data)

    print(f"Severity Score: {result['severity_score']}")
    print(f"Urgency Message: {result['urgency_message']}")
    print(f"Recommended Appointment Time: {result['recommended_appointment']}")
    print(f"Assessment Time: {result['assessment_time']}")

test_frontend_data_processing()
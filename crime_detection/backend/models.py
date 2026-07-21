from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    DateTime,
    ForeignKey
)
from sqlalchemy.orm import relationship

from datetime import datetime

from backend.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    firebase_uid = Column(String, unique=True)

    name = Column(String)

    email = Column(String, unique=True)

    phone = Column(String)

    emergency_phone = Column(String)

    emergency_email = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)


class Incident(Base):

    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)

    incident_type = Column(String)

    confidence = Column(Float)

    status = Column(String)

    acknowledged = Column(Boolean, default=False)

    snapshot_path = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )


class NotificationLog(Base):

    __tablename__ = "notification_logs"

    id = Column(Integer, primary_key=True)

    incident_id = Column(
        Integer,
        ForeignKey("incidents.id")
    )

    notification_type = Column(String)

    status = Column(String)

    sent_at = Column(
        DateTime,
        default=datetime.utcnow
    )


class Criminal(Base):
    """A person of interest entered by a dashboard user."""

    __tablename__ = "criminals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    phone = Column(String, nullable=True)
    address = Column(String, nullable=True)
    past_crime = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    photos = relationship(
        "CriminalPhoto",
        back_populates="criminal",
        cascade="all, delete-orphan",
    )


class CriminalPhoto(Base):
    __tablename__ = "criminal_photos"

    id = Column(Integer, primary_key=True, index=True)
    criminal_id = Column(Integer, ForeignKey("criminals.id"), nullable=False)
    photo_path = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    criminal = relationship("Criminal", back_populates="photos")


class CriminalMatch(Base):
    """Persisted face match for an active incident, shown as a dashboard alert."""

    __tablename__ = "criminal_matches"

    id = Column(Integer, primary_key=True, index=True)
    incident_id = Column(Integer, ForeignKey("incidents.id"), nullable=False, index=True)
    criminal_id = Column(Integer, ForeignKey("criminals.id"), nullable=False)
    confidence = Column(Float, nullable=False)
    snapshot_path = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    criminal = relationship("Criminal")

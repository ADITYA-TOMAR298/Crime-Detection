from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    DateTime,
    ForeignKey
)

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
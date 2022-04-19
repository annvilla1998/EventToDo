from app.models import db, Task
from faker import Faker

faker = Faker()

# Adds a demo user, you can add other users here if you want
def seed_tasks():
    for _ in range(40):
        task = Task(
            name = "Book Flight",
            description = "check deals on travelocity",
            completed = False, 
            due_date = faker.future_datetime(),
            event_id = faker.random_int(min=1, max=40),
            user_id = 1
        )

        db.session.add(task)
        db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
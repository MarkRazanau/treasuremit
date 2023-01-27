FROM fnndsc/python-poetry:1.3.1
WORKDIR /code
COPY ./pyproject.toml /code/pyproject.toml
COPY ./poetry.lock /code/poetry.lock
RUN poetry install
COPY ./waldobook /code/waldobook

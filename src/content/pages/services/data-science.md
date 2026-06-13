---
metadata:
  title: 'Data science and machine learning'
  description: 'Time-series forecasting, tabular data modelling, classical statistical methods, and ML pipelines built for production.'
hero:
  tagline: 'Data science and machine learning'
  title: 'Support your decisions with data'
  subtitle: 'From a prototype to production, we design, model, benchmark and deploy models based on sensor data, business data and real-world data.'
proof:
  title: 'Data science made by actual scientists'
  tagline: 'What to expect'
  columns: 2
  items:
    - title: 'PhD level development'
      description: 'Our modelling work is led by a doctorate from HES-SO and UNIFR with peer-reviewed publications in the field of data science applied to buildings and all the kind of data they include.'
      icon: 'tabler:school'
    - title: 'onTime, our open-source library'
      description: 'We develop onTime, our library for benchmarking time-series forecasting models. The infrastructure we use ourselves, made public.'
      icon: 'tabler:package'
    - title: 'Reproducible by design'
      description: 'Versioned data, seeded experiments and pipelines that rerun end to end — results you can check and re-run, not take on faith.'
      icon: 'tabler:repeat'
    - title: 'Honest about uncertainty'
      description: 'Forecasts ship with confidence intervals, models with their known failure modes. Decisions need error bars, not just point estimates.'
      icon: 'tabler:chart-candle'
forecasting:
  contentHeading: 'Time series forecasting'
  contentBody: 'Forecasting work that survives contact with production. Better predictions mean less overproduction, for operators and for the environment.'
  items:
    - title: 'Time-series forecasting'
      description: 'Sensor readings, operational metrics, and more. Models ranging from ARIMA and exponential smoothing to deep neural networks chosen to match your data, not our preferences.'
      icon: 'tabler:chart-line'
    - title: 'Foundation models for time series'
      description: 'We track and benchmark modern time-series foundation models. We have published peer-reviewed work comparing them against classical baselines on real industrial data.'
      icon: 'tabler:brain'
    - title: 'Classical statistical methods'
      description: 'When a transparent ARIMA, regression or state-space model is the right answer, we say so. Simple beats sophisticated when the simple one is honest about uncertainty.'
      icon: 'tabler:math-function'
  image:
    src: '~/assets/images/placeholder.png'
    alt: 'Data analytics dashboard with time-series'
# TODO: review claims — section drafted, confirm scope and examples
tabular:
  isReversed: true
  contentHeading: 'Tabular data modelling'
  contentBody: 'Most industrial data lives in tables, sensor aggregates, maintenance logs, lab results, business records. We build models that turn them into decisions.'
  items:
    - title: 'Classification and regression'
      description: 'Fault detection, energy performance, quality prediction, risk scoring — supervised models on structured data, scoped around the decision they support.'
      icon: 'tabler:table'
    - title: 'Gradient-boosted trees before deep learning'
      description: 'On tabular data, well-tuned gradient-boosted trees are still the benchmark to beat. We start there and only add complexity when it pays for itself.'
      icon: 'tabler:binary-tree'
    - title: 'Interpretable results'
      description: 'Feature importance, honest uncertainty and models domain experts can interrogate, because a prediction nobody trusts changes nothing.'
      icon: 'tabler:zoom-check'
  image:
    src: '~/assets/images/placeholder.png'
    alt: 'Tabular data modelling on structured industrial data'
toolbox:
  contentHeading: 'From prototype to production'
  contentBody: 'A model is only half the work. Around it: the data pipelines that feed it, the benchmarks that justify it and the monitoring that keeps it honest once deployed.'
  items:
    # TODO: review claim — generalised from the energy page (sensor platforms, time-series databases)
    - title: 'Data pipelines and infrastructure'
      description: 'Ingestion, storage and dashboards for the data your models depend on — from business records to high-volume sensor streams.'
      icon: 'tabler:stack-2'
    - title: 'Benchmarking before shipping'
      description: 'Every model proves itself against honest baselines before it ships — evaluation tied to the decision you need to make, not to a leaderboard.'
      icon: 'tabler:scale'
    - title: 'Deployment, monitoring and retraining'
      description: "Models degrade; we plan for it. Deployment on your infrastructure, monitoring for drift and retraining loops — not notebooks left on someone's laptop."
      icon: 'tabler:activity'
  image:
    src: '~/assets/images/placeholder.png'
    alt: 'ML pipeline from data to production'
tech:
  tagline: Stack
  title: 'Technologies we use'
  subtitle: 'The day-to-day toolkit for modelling work.'
  items:
    - { name: 'Python', icon: 'simple-icons:python' }
    - { name: 'PyTorch', icon: 'simple-icons:pytorch' }
    - { name: 'scikit-learn', icon: 'simple-icons:scikitlearn' }
    - { name: 'pandas', icon: 'simple-icons:pandas' }
    - { name: 'Jupyter', icon: 'simple-icons:jupyter' }
    - { name: 'Docker', icon: 'simple-icons:docker' }
# Curated selection rendered as a carousel from the case-studies collection.
# 3rd pick (big-building-data) is cross-tag — adjust the list freely.
caseStudies: ['foundation-models-benchmark', 'district-heating-forecasting', 'big-building-data']
nextSteps:
  tagline: 'Contact'
  title: 'What happens next'
  subtitle: 'No brief, no obligation — you talk to an engineer, not a salesperson.'
  items:
    - title: 'Send the question you are actually trying to answer'
      description: 'A sentence or two is plenty — pick a couple of tags below and describe the decision the model should support. No clean dataset required.'
    - title: 'An honest read on whether modelling is the right tool'
      description: 'And if so, what kind — with what data, and at what cost. If a simple baseline or no model at all is the better answer, we say so.'
    - title: 'A small first study before a big bet'
      description: 'If it is a fit, we scope a small, well-defined first study — so you can judge the work on real data before committing further.'
quickStart:
  title: 'Start a conversation'
  categories:
    - 'Forecasting'
    - 'Machine learning'
    - 'Data pipelines'
    - 'Not sure yet'
  button: 'Send'
  consent: 'By sending this, you agree we may store and use your message to reply. We don’t share it.'
---

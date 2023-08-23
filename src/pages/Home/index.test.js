import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import EventList from "../../containers/Events";
import PeopleCard from "../../components/PeopleCard";
import EventCard from "../../components/EventCard";
import { DataProvider } from "../../contexts/DataContext";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé!");
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<EventList />);
    const eventslist = screen.getByTestId("event-list");
    expect(eventslist).toBeInTheDocument();
  });

  it("a list a people is displayed", () => {
    const props = {
      imageSrc: "http://src-image",
      imageAlt: "image-alt-text",
      name: "test name",
      position: "test position",
    };
    render(<PeopleCard {...props} />);

    const peoplecard = screen.getByTestId("people-card");
    expect(peoplecard).toBeInTheDocument();
  });

  it("a footer is displayed", () => {
    render(<Home />);
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", () => {
    const props = {
      imageSrc: "http://src-image",
      imageAlt: "image-alt-text",
      date: new Date("2022-04-01"),
      title: "test event",
      label: "test label",
    };
    render(<EventCard {...props} />);
    const lastEventCard = screen.getByTestId("card-testid");
    expect(lastEventCard).toBeInTheDocument();
  });
});

describe("Home Page", () => {
  it("displays success message after submitting the form", async () => {
    const mockData = {
      events: [
        {
          title: "Événement 1",
          date: "2023-08-23",
        },
      ],
    };

    // Rendu du composant Home avec le contexte de données fictives
    render(
      <DataProvider data={mockData}>
        <Home />
      </DataProvider>
    );

    // Simule un clic sur le bouton d'envoi du formulaire
    const submitButton = screen.getByRole("button", { name: /envoyer/i });
    fireEvent.click(submitButton);

    // Attends que le message de succès s'affiche
    await (() => {
      const successMessage = screen.getByText("Message envoyé!");
      expect(successMessage).toBeInTheDocument();
    });
  });
});

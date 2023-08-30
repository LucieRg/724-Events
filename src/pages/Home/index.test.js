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
      await screen.findAllByText("Message envoyé!");
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

describe("Page Component", () => {
  it("renders without errors", () => {
    render(<Home />);
  });

  it("renders footer information correctly", () => {
    render(<Home />);
    const address = screen.getByText(
      /45 avenue de la République, 75000 Paris/i
    );
    const phoneNumber = screen.getByText(/01 23 45 67 89/i);
    const email = screen.getByText(/contact@77events.com/i);

    expect(address).toBeInTheDocument();
    expect(phoneNumber).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });
});
